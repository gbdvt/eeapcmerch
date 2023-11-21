import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from './SignUp.module.css'

import SignUpButton from '../SignUpButton/SignUpButton'
import SimpleTextInput from '../../../../Components/Forms/Input/SimpleTextInput/SimpleTextInput'
import SimpleButton from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'
import SimpleSelect from '../../../../Components/Forms/Input/SelectInput/SelectInput'
import PhoneInput from '../../../../Components/Forms/Input/PhoneInput/PhoneInput'

import SignUpSelectOptions from './SignUpSelectOptions'
import setAuthInfo from '../../../../Utils/Redux/Actions/Auth'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { isValidPhoneNumber } from 'react-phone-number-input'


const SignUp = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState('')
    const [status, setStatus] = useState(undefined)

    const history = useHistory()

    const RequestSignIn = async () => {
        setStatus('loading')
        if (password != repeatPassword) {
            setStatus(undefined)
            toast.error("The two passwords do not match")
            return
        } else if (!isValidPhoneNumber(mobile)) {
            setStatus(undefined)
            toast.error("The phone number is not valid")
            return
        }
        const response = await axios.post('/api/auth/signup', {
            email,
            name,
            password,
            phoneNumber: mobile
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
            <SignUpButton linkTo={'/auth/login'} text={"If you already have an account, log in now!"} />
            <form className={styles.SignUpForm}>
                <SimpleTextInput type={'email'} value={email} onChange={setEmail} placeholder={"email"} label={"E-mail:"}/>
                <SimpleTextInput value={name} onChange={setName} placeholder={"name"} label={"Full name:"}/>
                <PhoneInput placeholder={"Phone number"} value={mobile} set={setMobile} label={"Phone Number:"} />
                <SimpleTextInput type={'password'} value={password} onChange={setPassword} placeholder={"password"} label={"Password:"}/>
                <SimpleTextInput type={'password'} value={repeatPassword} onChange={setRepeatPassword} placeholder={"confirm password"} label={"Confirm password:"}/>
                <SimpleButton disabled={status == "loading"} submit={RequestSignIn} >Sign Up   <FontAwesomeIcon icon={faSignInAlt} /></SimpleButton>
                <div className={styles.bottomLinkContainer}>
                    <Link to="/auth/login">Or LogIn instead</Link>
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

export default connect(mapStateToProps)(SignUp)