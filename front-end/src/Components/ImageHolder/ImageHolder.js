import styles from './ImageHolder.module.css'
import react from 'react'

const ImageHolder = (props) => {
    return (
        <div className={styles.imageContainer}>
            <img src={props.image} />
            <div className={styles.centered}>{props.children}</div>
        </div>
    )
}

export default ImageHolder