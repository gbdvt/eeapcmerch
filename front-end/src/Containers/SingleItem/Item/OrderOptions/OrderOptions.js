import styles from './OrderOptions.module.css'
import React, {useEffect, useState} from 'react'

import SelectInput from '../../../../Components/Forms/Input/SelectInput/SelectInput'
import Button from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const OrderOptions = (props) => {

    const [validColors, setValidColors] = useState(props.data.colors)
    const [showColor, SetShowColor] = useState(false)

    useEffect(() => {
        if (props.size !== "") {
            let NewValidColors = []
            Object.entries(props.data.stock[props.size.value]).forEach(([key, value]) => {
                if (value) {
                    NewValidColors.push(key)
                }
            })
            setValidColors(NewValidColors)
            SetShowColor(true)
        } else {
            SetShowColor(false)
        }
    }, [props.size])
    return (
        <div>
            <SelectInput options={props.data.sizes.map(size => ({ value: size, label: size }))} onChange={props.setSize} value={props.size} label={"Select a size"} />
            {showColor && <SelectInput options={validColors.map(size => ({ value: size, label: size }))} onChange={props.setColor} value={props.color} label={"Select a color"} />}
            <Button submit={props.AddToCart} disabled={props.status == "loading"}>Add to cart   <FontAwesomeIcon icon={faShoppingBasket} /></Button>
        </div>
    )
}

export default OrderOptions