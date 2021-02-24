import React from "react"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";
import Widget from '../components/Widget'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { setEmployData, Login } from "../../actions/user"

function SignIn(props) {

    const dispatch = useDispatch()
    const password = useSelector(state => state.employes.password ? state.employes.password : '')
    const phone = useSelector(state => state.employes.phone ? state.employes.phone : '')

    const submit = () => {
        if (!password) {
            toast.warn("Password is required.")
            return
        }
        if (!phone) {
            toast.warn("Phone is required.")
            return
        }
        let datas = {
            password: password,
            phone: phone
        }
        dispatch(Login(datas));

    }
    const handleChange = (event) => {
        dispatch(setEmployData(event.target.name, event.target.value));
    }
    const list = {
        top: '27%'
    }
    return (
        <Widget style={list}>
            <FormInput id="phone" name="phone" onChange={handleChange} type="text" placeholder=" Enter phone" />
            <FormInput id="password" name="password" onChange={handleChange} type="password" placeholder=" Enter Password" />
            <Button onClick={submit} label='Submit'></Button>
            <p style={{ textAlign: "center", marginTop: 5 }}>Don't have an account?<a href="./sign-up"> Sign Up</a><br />
                <a href="./forgot-password" > Forgot Your Password?</a></p>
        </Widget>
    )
}

export default (SignIn)