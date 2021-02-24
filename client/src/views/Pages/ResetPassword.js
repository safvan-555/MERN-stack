import React, { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";
import Widget from '../components/Widget'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import '../components/index.css'
import { setEmployData, Reset_Password } from "../../actions/user"

function ResetPassword(props) {

    const history = useHistory();
    const dispatch = useDispatch()
    const password = useSelector(state => state.employes.password ? state.employes.password : '')
    const confirm_password = useSelector(state => state.employes.confirm_password ? state.employes.confirm_password : '')
    const load = useSelector(state => state.employes.load ? state.employes.load : true)

    useEffect(() => {
        LoadContent()
    })
    const LoadContent = () => {
        if (load) {
            var url_string = window.location.href
            var url = new URL(url_string);
            var resetcode = url.searchParams.get("verify");
            if (!resetcode) {
                history.push('/forgot-password')
            }
        }
    }
    const submit = () => {
        var url_string = window.location.href
        var url = new URL(url_string);
        var resetcode = url.searchParams.get("verify");
        if (!password) {
            toast.warn("Password is required.")
            return
        }
        if (!confirm_password) {
            toast.warn("Confirm Password is required.")
            return
        }
        if (!resetcode) {
            toast.warn("use valid link or link expires")
            return
        }
        let data = {
            new_password: password,
            confirm_password: confirm_password,
            verify_code: resetcode
        }
        dispatch(Reset_Password(data));
    }
    const handleChange = (event) => {
        dispatch(setEmployData(event.target.name, event.target.value));
    }

    const list = {
        top: '21%'
    }
    return (
        <Widget style={list}>
            <p>Creat new Password</p>
            <p>Your new password must be diffrent from previous used password.</p>
            <FormInput onChange={handleChange} id="password" name="password" class="form-control" type="password" placeholder=" Enter Password" required="" aria-required="true" />
            <FormInput onChange={handleChange} id="confirm_password" name="confirm_password" class="form-control" type="password" placeholder=" Confirm Password" required="" aria-required="true" />

            <Button onClick={submit} label='Reset Password'></Button>
            <p style={{ marginTop: 5 }}>Don't have an account?<a href="./sign-in"> Login Now</a></p>
        </Widget>
    )
}

export default (ResetPassword)