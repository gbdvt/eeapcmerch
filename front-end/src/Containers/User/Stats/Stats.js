import styles from './Stats.module.css'
import React, {useState, useEffect} from 'react'

import { toast } from 'react-toastify'
import axios from 'axios'
import { connect } from 'react-redux'
import Loading from '../../../Components/Loaders/Circle/Circle'

import Overview from './Sections/Overview/Overview'
import OrdersBySize from './Sections/OrdersBySize/OrdersBySize'

const Stats = (props) => {

    const [status, setStatus] = useState("loading")
    const [data, setData] = useState({})

    const RequestStats = async () => {
        setStatus('loading')
        const response = await axios.get('/api/stats', {
            headers: {
                authorization: props.redux.auth.token
            }
        })
        if (response && response.status === 200) {
            setData(response.data)
            setStatus(undefined)
            console.log(data)
        } else {
            setStatus(undefined)
            toast.error('request unsuccessful, try again later')
        }
    }

    useEffect(RequestStats, [])

    const Content = () => (
        <div>
            <Overview data={data.overview} />
            <OrdersBySize data={data.items} />
        </div>
    )

    return status == "loading" ? <Loading /> : <Content />
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Stats)