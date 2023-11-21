import styles from './Overview.module.css'
import React from 'react'

import Expandable from '../../../../../Components/Expandable/Expandable'

const Overview = (props) => {
    return (
        <div>
            <Expandable label={"Overview:"} default={false}>
                <p>Overview</p>
            </Expandable>
        </div>
    )
}

export default Overview