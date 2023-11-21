import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Grid.module.css'

import SingleItem from './SingleItem/SingleItem'
import Loader from '../../../Components/Loaders/Circle/Circle'


const Dashboard = () => {
    const [Items, setItems] = useState([])
    const [Status, setStatus] = useState("loading")

    useEffect(async () => {
        const response = await axios.get(`/api/items/loadItems`)
        if (response && response.status === 200) {
            setItems(response.data)
            setStatus("OK")
        }
    }, [])
    return (
        <div>
            <div className={styles.grid}>
                {Items.map(item => <SingleItem item={item} />)}
            </div>
            {Status == "loading" && <Loader />}
        </div>
    )
}

export default Dashboard