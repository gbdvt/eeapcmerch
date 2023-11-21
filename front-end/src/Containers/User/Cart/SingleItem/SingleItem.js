import styles from './SingleItem.module.css'
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import {ModQuantity, RemoveItem} from '../../../../Utils/Redux/Actions/Cart'

const SingleItem = (props) => {

    const [status, setStatus] = useState(undefined)
    const [data, setData] = useState(undefined)
    const [quantity, setQuantity] = useState(props.item.quantity)

    const fetchItem = async () => {
        const response = await axios.get(`/api/items/fetchItem?id=${props.item.item}`)
        if (response && response.status === 200) {
            setData(response.data)
            setStatus('OK')
        } else {
            toast.error("Error while fetching Item")
        }
    }

    useEffect(() => {
        fetchItem()
    }, [])

    useEffect(() => {
        props.dispatch(ModQuantity({item: props.item.item, newQuantity: quantity}))
    }, [quantity])

    const RemoveItemFromCart = () => {
        props.dispatch(RemoveItem({item: props.item.item}))
    }


    const content = () => (
        <div className={styles.grid}>
            <div className={styles.textContainer}>
                <img className={styles.image} src={data.thumbnail} />
            </div>
            <div className={styles.textContainer}><h3>{data.title}</h3></div>
            <div className={styles.textContainer}>
                <h3>{quantity}</h3>
                <button onClick={() => quantity < 3 ? setQuantity(quantity + 1) : toast.error('cannot add to cart more than 4 items in one orders')}>+</button>
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
            </div>
            <div className={styles.textContainer}><h3>{`${parseFloat(data.price / 100)} €`}</h3></div>
            <div className={styles.textContainer}><h3>{props.item.size}</h3></div>
            <div className={styles.textContainer}><button onClick={RemoveItemFromCart}>Remove</button></div>
        </div>
    )

    return (
        <div>
            {status == "OK" && content()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(SingleItem)