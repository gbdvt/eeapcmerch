import styles from './PhoneInput.module.css'
import React from 'react'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneInputComponent = (props) => {
    return (
        <div>
            <label className={styles.label}>{props.label}</label>
            <PhoneInput defaultCountry={"ES"} className={styles.input} value={props.value} placeholder={props.placeholder} onChange={(num) => props.set(num)} />
        </div>
    )
}

export default PhoneInputComponent