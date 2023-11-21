import React from 'react'
import styles from './Actions.module.css'
import Button from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle, faTruck, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

const Actions = (props) => {

    return (
        <div className={styles.grid}>
            {/* {props.admin && <Button width={"70%"} submit={props.fulfill}><span style={{ color: "green" }}>Fulfill Order <FontAwesomeIcon icon={faCheckCircle} /></span></Button>} */}
            {(props.admin && props.orderStatus == "InProgress") && <Button disabled={props.status} width={"70%"} submit={props.ship}><span style={{ color: "blue" }}>Ship order <FontAwesomeIcon icon={faTruck} /></span></Button>}
            {(props.admin && props.orderStatus == "Shipped") && <Button disabled={props.status} width={"70%"} submit={props.return}><span style={{ color: "orange" }}>Return <FontAwesomeIcon icon={faUndoAlt} /></span></Button>}
            {props.orderStatus == "InProgress" && <Button disabled={props.status} width={"70%"} submit={props.cancel}><span style={{ color: "red" }}>Cancel Order <FontAwesomeIcon icon={faTimesCircle} /></span></Button>}
        </div>
    )
}


export default Actions
