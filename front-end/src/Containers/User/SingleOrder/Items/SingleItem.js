import styles from './SingleItem.module.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const SingleItem = (props) => {

    const [status, setStatus] = useState(undefined)
    const [data, setData] = useState(undefined)

    const fetchItem = async () => {
        const response = await axios.get(`/api/items/fetchItem?id=${props.order.item}`)
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


    const content = () => (
        <div className={styles.grid}>
            <div className={styles.textContainer}>
                <img className={styles.image} src={data.thumbnail} />
            </div>
            <div className={styles.textContainer}><h3>{data.title}</h3></div>
            <div className={styles.textContainer}>
                <h3>{props.order.quantity}</h3>
            </div>
            <div className={styles.textContainer}><h3>{`${parseFloat(data.price / 100)} €`}</h3></div>
            <div className={styles.textContainer}><h3>{props.order.size}</h3></div>
            <div className={styles.textContainer}><h3>{props.order.color}</h3></div>
        </div>
    )

    return (
        <div>
            {status == "OK" && content()}
        </div>
    )
}

export default SingleItem