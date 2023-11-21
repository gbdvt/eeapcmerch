import React from 'react'
import styles from './SingleItem.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


const SingleItem = (props) => {
    return (
        <Link to={!props.function && props.to} onClick={props.function ? props.function : () => {}} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
            <div className={styles.innerContainer}>
                <FontAwesomeIcon className={styles.icon} icon={props.icon} />
                <h2>{props.text}</h2>
            </div>
        </Link>
    )
}

export default SingleItem