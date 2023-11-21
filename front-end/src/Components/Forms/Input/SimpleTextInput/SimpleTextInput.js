import React from 'react'
import styles from './SimpleTextInput.module.css'

const SimpleTextInput = (props) => {
    return (
        <div className={styles.outerContainer}>
            <label className={styles.label}>{props.label}</label>
            <input type={props.type || "text"} className={styles.textInput} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} value={props.value} />
        </div>
    )
}

export default SimpleTextInput