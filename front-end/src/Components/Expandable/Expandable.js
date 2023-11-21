import styles from './Expandable.module.css'
import React, {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Expand from 'react-expand-animated';

const Expandable = (props) => {

    const [open, setOpen] = useState(props.default)
    return (
        <div className={styles.Container}>
            <h2 onClick={() => setOpen(!open)}><FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} />{props.label}</h2>
            <Expand open={open}>
                <div className={styles.innerContainer}>
                    {props.children}
                </div>
            </Expand>
        </div>
    )
}

export default Expandable