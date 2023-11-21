import styles from './SignUpButton.module.css'
import React from 'react'

import { Link } from 'react-router-dom'

import ImagePeople from '../../../../Assets/Images/people.jpg'

import ImageHolder from '../../../../Components/ImageHolder/ImageHolder'


const SignUpButton = (props) => {
    return (
        <div>
            <ImageHolder image={ImagePeople} ><div className={styles.SignUpButton}><Link to={props.linkTo}>{props.text}</Link></div></ImageHolder>
        </div>
    )
}

export default SignUpButton