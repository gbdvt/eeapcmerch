import React, {useState, useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Nav.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faShoppingCart, faHome, faAddressCard, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Nav = (props) => {

    const [menuOpen, setOpen] = useState(false)



    return (
        <div className={styles.outerContainer}>
            <div className={styles.navHeader}>
                <Link to={'/'}><h1 className={styles.navSiteTitle}>Dikaas</h1></Link>
                <nav className={styles.navContainer}>
                    <span><NavLink className={styles.navLink} to={'/'}>Home</NavLink></span>
                    <span><NavLink className={styles.navLink} to={'/store'}>Store</NavLink></span>
                    <span><NavLink className={styles.navLink} to={'/about'}>About</NavLink></span>
                    <span><NavLink className={styles.navLink} to={props.redux.auth.isLoggedIn ? "/user" : '/auth/login'}>{props.redux.auth.isLoggedIn ? "My account" : "Log in"}</NavLink></span>
                </nav>
                <nav className={styles.mobileNavHeader} onClick={() => setOpen(!menuOpen)}>
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </nav>
            </div>
            <div className={styles.navMobileContainer} style={{height: menuOpen ? "12.5em" : "0"}}>
                <nav className={styles.navMobileInnerContainer}>
                    <span><NavLink onClick={() => setOpen(false)} className={styles.navLink} to={'/'}><FontAwesomeIcon icon={faHome} />Home</NavLink></span>
                    <span><NavLink onClick={() => setOpen(false)} className={styles.navLink} to={'/store'}><FontAwesomeIcon icon={faShoppingCart} /> Store</NavLink></span>
                    <span><NavLink onClick={() => setOpen(false)} className={styles.navLink} to={'/about'}><FontAwesomeIcon icon={faInfoCircle} /> About</NavLink></span>
                    <span><NavLink onClick={() => setOpen(false)} className={styles.navLink} to={props.redux.auth.isLoggedIn ? "/user" : '/auth/login'}><FontAwesomeIcon icon={faAddressCard} /> {props.redux.auth.isLoggedIn ? "My account" : "Log in"}</NavLink></span>
                </nav>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Nav)