import styles from './SelectInput.module.css'
import React from 'react'
import Select from 'react-select';

const SelectInput = (props) => {
    return (
        <div className={styles.box}>
            <label className={styles.label}>{props.label}</label>
            <Select isSearchable={false} value={props.value} onChange={value => props.onChange(value)} options={props.options} />
        </div>
    )
}

export default SelectInput