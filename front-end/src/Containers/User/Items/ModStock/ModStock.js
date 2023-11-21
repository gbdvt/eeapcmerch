import styles from './ModStock.module.css'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import StockMatrix from '../../../../Components/Forms/StockMatrix/StockMatrix'
import Loader from '../../../../Components/Loaders/Circle/Circle'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import Button from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'
import SimpleInput from '../../../../Components/Forms/Input/SimpleTextInput/SimpleTextInput'
import AreaInput from '../../../../Components/Forms/Input/TextArea/TextArea'
import { set } from 'mongoose';

const ModStock = (props) => {

    const history = useHistory()
    const { id } = useParams()
    const [data, setData] = useState({})
    const [stock, setStock] = useState({})
    const [status, setStatus] = useState('loading')
    const [actionStatus, setActionStatus] = useState(undefined)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        fetchItem()
    }, [])


    const fetchItem = async () => {
        const response = await axios.get(`/api/items/fetchItem?id=${id}`)
        if (response && response.status === 200) {
            setData({ thumb: response.data.thumbnail, title: response.data.title, id: response.data._id, colors: response.data.colors, sizes: response.data.sizes })
            setStock(response.data.stock)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setPrice((response.data.price / 100).toLocaleString("es", {style:"currency", currency:"EUR"}))
            setStatus('OK')
        }
    }

    const SaveItem = async () => {
        setActionStatus('loading')
        const response = await axios.post('/api/items/update', {
            id: data.id,
            stock,
            title,
            description,
            price: parseFloat(price.replace(",", ".")) * 100
        }, {
            headers: {
                authorization: props.redux.auth.token
            }
        }).catch(e => {
            setActionStatus(undefined)
            toast.error('Save unsuccessful, check the inputs and try again')
            console.log(e)
        })
        if (response && response.status === 200) {
            setActionStatus(undefined)
            toast.success('Saved successfuly', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            history.push('/user')
        }
    }

    const Content = () => (
        <div>
            <h1>Modify this item:</h1>
            <div>
                <h1>{data.title}</h1>
                <img src={data.thumb} className={styles.image} />
            </div>
            <div>
                <SimpleInput value={title} onChange={setTitle} label={"Title"} placeholder={"Enter a new title"} />
                <AreaInput value={description} onChange={setDescription} label={"Description"} placeholder={"Enter a new description"} />
                <SimpleInput value={price} onChange={setPrice} label={"Price"} placeholder={"Enter a new price"} />
            </div>

            <StockMatrix load={stock} sizes={data.sizes} colors={data.colors} stock={stock} setStock={setStock} />
            <div className={styles.buttonContainer}>
                <Button disabled={actionStatus == "loading"} submit={SaveItem}>Save   <FontAwesomeIcon icon={faSave} /></Button>
            </div>
        </div>
    )

    return status != "loading" ? Content() : <Loader />
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(ModStock)