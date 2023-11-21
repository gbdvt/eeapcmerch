import React, {useEffect} from 'react'
import styles from './SingleItem.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


const SingleItem = (props) => {
    useEffect(() => {
        console.log(props.item)
    }, [])
    return (
        <Link to={`/items/${props.item._id}`} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
            <div key={props.item._id} className={styles.innerContainer}>
                <img src={props.item.thumbnail} className={styles.image}/>
                <div className={styles.titleContainer}>
                    <h3>{props.item.title}</h3>
                    <h3 className={styles.price}>{(props.item.price / 100).toLocaleString("es", {style:"currency", currency:"EUR"})}</h3>
                </div>
            </div>
        </Link>
    )
}

export default SingleItem