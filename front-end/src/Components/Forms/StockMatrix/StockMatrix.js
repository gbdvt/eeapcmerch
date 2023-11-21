import styles from './StockMatrix.module.css'
import React, { useState, useEffect } from 'react'

import Expandable from '../../Expandable/Expandable'

const StockMatrix = (props) => {

    useEffect(() => {
        if (props.load) {
            console.log(props.load)
        }
    }, [])

    const handleCheckChnage = (size, color, checked) => {
        let update = {}
        update[size] = { ...props.stock[size] } || {}
        update[size][color] = checked
        props.setStock({
            ...props.stock,
            ...update
        })
        console.log(update)
    }

    const content = () => (
        <table className={styles.mainTable}>
                <tr>
                    <th>Sizes</th>
                    {props.sizes.map(size => <th>{size}</th>)}
                </tr>
                {props.colors.map(color => (
                    <tr className={styles.row}>
                        <td>{color}</td>
                        {props.sizes.map(size => <td>
                            <input onChange={(e) => handleCheckChnage(size, color, e.target.checked)} defaultChecked={props.load ? props.load[size][color] : true} className={styles.checkbox} type={'checkbox'} />
                        </td>)}
                    </tr>
                ))}
            </table>
    )

    return (
        <Expandable default={true} label={"Stock matrix:"}>
            {(props.sizes.length != 0 && props.sizes.length != 0) ? content() : <h2>Please ensure you have at least one color and size to modify the stock</h2>}
        </Expandable>
    )
}

export default StockMatrix