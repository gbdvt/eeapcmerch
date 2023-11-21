import React from 'react'
import styles from './TextArea.module.css'

const SimpleTextInput = (props) => {
    return (
        <div className={styles.outerContainer}>
            <label className={styles.label}>{props.label}</label>
            <textarea className={styles.textArea} type={props.type || "text"} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} value={props.value} />
        </div>
    )
}

export default SimpleTextInput