import React from 'react'
import CircleLoader from "react-spinners/CircleLoader";

import styles from './Cricle.module.css'

const DataTable = props => (
    <div className={styles.loaderContainer}>
        <div className={styles.innerContainer}>
            <CircleLoader color={"blue"} loading={true} size={150} />
        </div>
    </div>
)


export default DataTable