import styles from './Link.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

import ImageHolder from '../../ImageHolder/ImageHolder'

const ImageLink = (props) => {

    const external = () => (
        <div className={styles.outerLinkContainer}>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                <div className={styles.textContainer}>
                    {props.children}
                </div>
            </a>
        </div>
    )

    const internal = () => (
        <div className={styles.outerLinkContainer}>
            <Link to={props.link}>
                <div className={styles.textContainer}>
                    {props.children}
                </div>
            </Link>
        </div>
    )
    return (
        <div className={styles.outerContainer}>
            <ImageHolder image={props.image}>
                {props.external ? external() : internal()}
            </ImageHolder>
        </div>
    )
}

export default ImageLink