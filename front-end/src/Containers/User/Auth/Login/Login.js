import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from './Login.module.css'

import SignUpButton from '../SignUpButton/SignUpButton'
import SimpleTextInput from '../../../../Components/Forms/Input/SimpleTextInput/SimpleTextInput'
import SimpleButton from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import setAuthInfo from '../../../../Utils/Redux/Actions/Auth'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [status, setStatus] = useState(undefined)
    const history = useHistory()

    const RequestLogiIn = async () => {
        setStatus('loading')
        const response = await axios.post('/api/auth/login', {
            email,
            password
        })
        if (response && response.status === 200 && response.data.token) {
            props.dispatch(setAuthInfo({ token: response.headers['x-auth-token'], ...response.data }))
            setStatus(undefined)
            history.push('/user')
            toast.success('Login successful' ,{
                position: toast.POSITION.BOTTOM_RIGHT,
              })
        } else {
            setStatus(undefined)
            toast.error('Login unsuccessful, check the credencials and try again' ,{
                position: toast.POSITION.BOTTOM_RIGHT,
              })
        }
    }

    return (
        <div>
            <SignUpButton linkTo={'/auth/signup'} text={"If you still dont have an account, create one now!"} />
            <form className={styles.LoginForm}>
                <SimpleTextInput type={'email'} value={email} onChange={setEmail} placeholder={"email"} label={"E-mail:"}/>
                <SimpleTextInput type={'password'} value={password} onChange={setpassword} placeholder={"password"} label={"Password:"}/>
                <SimpleButton disabled={status == "loading"} submit={RequestLogiIn}>Log in   <FontAwesomeIcon icon={faSignInAlt} /></SimpleButton>
                <div className={styles.bottomLinkContainer}>
                    <Link to="/auth/signup">Or SignUp instead</Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        redux: state
    }
}

export default connect(mapStateToProps)(Login)