import React from 'react'
import styles from './Contruction.module.css'
import ConstructionImage from '../../Assets/Images/construction.png'

const UnderConstruction = () => {
    return (
        <div>
            <img className={styles.image} src={ConstructionImage} />
        </div>
    )
}

export default UnderConstruction