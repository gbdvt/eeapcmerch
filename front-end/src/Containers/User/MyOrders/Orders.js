import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import styles from './Orders.module.css'
import SingleOrder from './SingleItem/SingleOrder'
import Loader from '../../../Components/Loaders/Circle/Circle'

import Filters from './Filter/Filter'

const Orders = (props) => {

    const [status, setStatus] = useState(undefined)
    const [orders, setOrders] = useState(undefined)

    const fetchOrders = async (options = {}) => {
        const requestURL = props.all ? "/api/orders/loadAllOrders" : "/api/orders/loadMyOrders"
        setStatus('loading')
        const response = await axios.post(requestURL, options, {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            setOrders(response.data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1))
            setStatus(undefined)
        } else {
            setStatus(undefined)
            toast.error('Cannot fetch your orders')
        }
    }

    useEffect(fetchOrders, [])

    const OrdersContent = () => (
        <div>
            <div>{orders.map((order) => <SingleOrder order={order} extended={props.all}/>)}</div>
        </div>
    )


    return (
        <div>
            <h1>{props.all ? "All" : "My"} Orders:</h1>
            {props.all && <Filters submit={fetchOrders} />}
            <div className={props.all ? styles.ExtendedGrid : styles.grid}>
                <div className={styles.textContainer}><h3>Amount</h3></div>
                {!props.all && <div className={styles.textContainer}><h3>Number of items</h3></div>}
                <div className={styles.textContainer}><h3>Date Ordered</h3></div>
                <div className={styles.textContainer}><h3>Status</h3></div>
                {props.all && <div className={styles.textContainer}><h3>Name</h3></div>}
                <div className={styles.textContainer}><h3>Details</h3></div>
            </div>
            {status == "loading" ? <Loader /> : (( !orders || orders.length == 0 ) ? <h1 className={styles.ItemsMessage}>{ props.all ? "No order created yet" : "You have no orders yet"}</h1> : OrdersContent())}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Orders)