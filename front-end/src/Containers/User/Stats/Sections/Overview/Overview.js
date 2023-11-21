import styles from './Overview.module.css'
import React, {useEffect} from 'react'

import Expandable from '../../../../../Components/Expandable/Expandable'

const Overview = (props) => {
    useEffect(() => console.log(props), [])
    return (
        <div>
            <Expandable label={"Overview:"} default={false}>
                <h2>Predicted Income: {`${parseFloat(props.data.TotalPredictedIncome / 100)} €`}</h2>
                <table className={styles.mainTable}>
                    <tr>
                        <th>Number of items</th>
                        <th>Number of users</th>
                        <th>Number of orders</th>
                    </tr>
                    <tr className={styles.row}>
                        <td>{props.data.nItems}</td>
                        <td>{props.data.nUsers}</td>
                        <td>{props.data.nOrders}</td>
                    </tr>
                </table>
            </Expandable>
        </div>
    )
}

export default Overview