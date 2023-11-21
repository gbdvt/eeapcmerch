import React, { useState } from 'react'
import styles from './Filter.module.css'

import Button from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'
import SimpleTextInput from '../../../../Components/Forms/Input/SimpleTextInput/SimpleTextInput'
import SimpleSelect from '../../../../Components/Forms/Input/SelectInput/SelectInput'
import Expandable from '../../../../Components/Expandable/Expandable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const progressOptions = [
    {value: "All", label: "All"},
    {value: "InProgress", label: "In Progess"},
    {value: "Shipped", label: "Shipped"},
    {value: "Returned", label: "Returned"},
    {value: "Cancelled", label: "Cancelled"}
]

const Filters = (props) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [orderStatus, setOrderStatus] = useState(progressOptions[0])

    const submit = () => {
        const options = {}

        if (email != "") { options.email = email }
        if (name != "") { options.name = name }
        if (orderStatus.value != "All") { options.status = orderStatus.value }

        props.submit(options)
    }

    return (

        <Expandable label={"Filters:"} default={false}>
            <SimpleSelect options={progressOptions} onChange={setOrderStatus} value={orderStatus} label={"Order status"} />
            <SimpleTextInput type={'Name'} value={email} onChange={setEmail} placeholder={"Search by email"} label={"E-mail:"} />
            <SimpleTextInput value={name} onChange={setName} placeholder={"Search by name"} label={"Full name:"} />  
            <div className={styles.buttonContainer}><div className={styles.innerContainer}><Button submit={submit}>Search <FontAwesomeIcon icon={faSearch} /></Button></div></div>
        </Expandable>
    )
}

export default Filters