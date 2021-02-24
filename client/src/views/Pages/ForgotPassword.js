import React from "react"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import isEmail from 'validator/lib/isEmail';
import { toast } from "react-toastify";
import Widget from '../components/Widget'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import '../components/index.css'
import { setEmployData, SendInstruction } from "../../actions/user"


function ForgotPassword(props) {

    const dispatch = useDispatch()
    const email = useSelector(state => state.employes.email ? state.employes.email : '')

    const submit = () => {
        if (!isEmail(email)) {
            toast.warn("Please use valid email")
            return
        }
        let data = {
            email: email,
        }
        dispatch(SendInstruction(data));
    }
    const list = {
        top: '22%'
    }

    const handleChange = (event) => {
        dispatch(setEmployData(event.target.name, event.target.value));
    }
    return (
        <Widget style={list}>
            <p>Reset Password</p>
            <p>Enter the email associated with your account and we'll send an email with instruction to reset you password.</p>
            <FormInput id="email" onChange={handleChange} name="email" class="form-control" type="text" placeholder=" Enter Email" required="" aria-required="true" />

            <Button onClick={submit} label='Send Instructions'></Button>
            <p style={{ marginTop: 5 }}>Don't have an account?<a href="./sign-in"> Login Now</a></p>
        </Widget>
    )
}


export default (ForgotPassword)