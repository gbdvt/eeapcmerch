import React from 'react'
import styles from './SimpleButton.module.css'


const SimpleButton = (props) => {

    const submitForm = (e) => {
        e.preventDefault()
        props.submit()
    }

    return (
        <button style={{width: props.width || "100%"}} disabled={props.disabled} onClick={submitForm} className={styles.button}>
            {props.children}
        </button>
    )
}

export default SimpleButton