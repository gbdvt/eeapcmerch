import React from 'react'
import styles from './Dashboard.module.css'

import SingleItem from './SingleItem/SingleItem'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {logout} from '../../../Utils/Redux/Actions/Auth'

import { faPlus, faShoppingCart, faReceipt, faTasks, faSignOutAlt, faChartPie } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {

    const history = useHistory()

    const LogOut = () => {
        props.dispatch(logout())
        toast.success("Logged out sccessfuly")
        history.push('/')
    }

    return (
        <div>
            <div className={styles.grid}>
                { props.redux.auth.isAdmin && <SingleItem key={"NewItem"} to={'/user/new-item'} text={"New Item"} icon={faPlus} />}
                { props.redux.auth.isAdmin && <SingleItem key={"All Orders"} to={'/user/all-orders'} text={"All Orders"} icon={faTasks} />}
                { props.redux.auth.isAdmin && <SingleItem key={"Statistics"} to={'/user/stats'} text={"Statistics"} icon={faChartPie} />}
                <SingleItem key={"My Cart"} to={'/user/cart'} text={"My Cart"} icon={faShoppingCart} />
                <SingleItem key={"My Orders"} to={'/user/orders'} text={"My Orders"} icon={faReceipt} />
                <SingleItem function={LogOut} key={"Log Out"} text={"Log Out"} icon={faSignOutAlt} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Dashboard)