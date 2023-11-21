import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios'
import styles from './SingleOrder.module.css'
import moment from 'moment'
// import Item from './Items/Items'
import { connect } from 'react-redux'

import SingleItem from './Items/SingleItem'
import Actions from './Actions/Actions'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

const SingleOrder = (props) => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [status, setStatus] = useState('loading')
    const [actionStatus, setActionStatus] = useState(undefined)
    const history = useHistory()

    const fetchArticle = async () => {
        const response = await axios.get(`/api/orders/fetchOrder?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            setData(response.data)
            setStatus('OK')
            console.log(response.data)
        }
    }

    const CancelOrder = async () => {
        console.log('cancel')
        setActionStatus("loading")
        const response = await axios.get(`/api/orders/cancel?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            toast.success("Order has been canceled, paid amount returned")
            setActionStatus(undefined)
            history.goBack()
        }
    }

    const FulfillOrder = async () => {
        setActionStatus("loading")
        const response = await axios.get(`/api/orders/ship?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            toast.success("Order has been shipped")
            setActionStatus(undefined)
            history.goBack()
        }
    }

    const ReturnOrder = async () => {
        setActionStatus("loading")
        const response = await axios.get(`/api/orders/return?id=${id}`, {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            toast.success("Order has been marked as returned, amount has been returned to the consumer")
            setActionStatus(undefined)
            history.goBack()
        }
    }


    useEffect(() => {
        fetchArticle()
    }, [])

    const shipment = () => (
        <>
            <div className={styles.textInfoContainer}><h3>Name:</h3> <h3>{data.shipment.shipping_name}</h3></div>
            <div className={styles.textInfoContainer}><h3>City:</h3> <h3>{`${data.shipment.shipping_address_city}, ${data.shipment.shipping_address_country}`}</h3></div>
            <div className={styles.textInfoContainer}><h3>Shipment address:</h3> <h3>{data.shipment.shipping_address_line1}</h3></div>
            <div className={styles.textInfoContainer}><h3>Zip code:</h3> <h3>{data.shipment.shipping_address_zip}</h3></div>
        </>
    )

    const LoadedContent = () => {
        return (
            <div>
                <div className={styles.sectionContainer}>
                    <h2>Order Details:</h2>
                    <div className={styles.textInfoContainer}><h3>Date Created:</h3> <h3>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h3></div>
                    <div className={styles.textInfoContainer}><h3>Status:</h3> <h3>{data.status}</h3></div>
                    <div className={styles.textInfoContainer}><h3>Amount:</h3> <h3>{`${parseFloat(data.amount / 100)} €`}</h3></div>
                </div>
                <div className={styles.sectionContainer}>
                    <h2>Customer Details:</h2>
                    <div className={styles.textInfoContainer}><h3>Name:</h3> <h3>{data.authorData.name}</h3></div>
                    <div className={styles.textInfoContainer}><h3>E-mail:</h3> <h3>{data.authorData.email}</h3></div>
                    <div className={styles.textInfoContainer}><h3>Phone Number:</h3> <h3>{data.authorData.phoneNumber}</h3></div>
                </div>
                <div className={styles.sectionContainer}>
                    <h2>Shipment Details:</h2>
                    {data.shipment == "In Person" ? <h1>The Customer requested to recieve the order in person</h1> : shipment()}
                </div>
                <div className={styles.sectionContainer}>
                    <h2>Items:</h2>
                    <div className={styles.grid}>
                        <div className={styles.textContainer}><h3>Image</h3></div>
                        <div className={styles.textContainer}><h3>Title</h3></div>
                        <div className={styles.textContainer}><h3>Quantity</h3></div>
                        <div className={styles.textContainer}><h3>Price</h3></div>
                        <div className={styles.textContainer}><h3>Size</h3></div>
                        <div className={styles.textContainer}><h3>Color</h3></div>
                    </div>
                    {data.order.map(order => <SingleItem order={order} />)}
                </div>
                <Actions orderStatus={data.status} return={ReturnOrder} ship={FulfillOrder} cancel={CancelOrder} status={actionStatus} admin={props.redux.auth.isAdmin} />
            </div>
        )
    }

    return (
        <div>
            {status == 'OK' ? LoadedContent() : <h1>Loading...</h1>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(SingleOrder)