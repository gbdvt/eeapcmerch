import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios'
import styles from './SingleItem.module.css'
import Item from './Item/Item'
import Loader from '../../Components/Loaders/Circle/Circle'

const SinglePost = () => {

    const { id } = useParams()
    const [data, setData] = useState({})
    const [status, setStatus] = useState('loading')

    const fetchArticle = async () => {
        const response = await axios.get(`/api/items/fetchItem?id=${id}`)
        if (response && response.status === 200) {
            setData(response.data)
            console.log(response.data)
            setStatus('OK')
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [])
    
        return (
            <div>
                {status == 'OK' ? <Item data={data} /> : <Loader />}
            </div>
        )
}

export default SinglePost