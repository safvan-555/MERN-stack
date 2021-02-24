import React from "react"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { toast } from "react-toastify";
import FormInput from '../components/FormInput'
import Widget from '../components/Widget'
import Button from '../components/Button'
import '../components/index.css'
import { setEmployData, registerUser } from "../../actions/user"

function SignUp(props) {

    const dispatch = useDispatch()

    const firstname = useSelector(state => state.employes.firstname ? state.employes.firstname : '')
    const lastname = useSelector(state => state.employes.lastname ? state.employes.lastname : '')
    const email = useSelector(state => state.employes.email ? state.employes.email : '')
    const phone = useSelector(state => state.employes.phone ? state.employes.phone : '')
    const password = useSelector(state => state.employes.password ? state.employes.password : '')
    const confirm_password = useSelector(state => state.employes.confirm_password ? state.employes.confirm_password : '')




    const submit = () => {
        if (!isEmail(email)) {
            toast.warn("Please use valid email")
            return
        }
        if (!(firstname && lastname && password && confirm_password)) {
            toast.warn("Please fill all fields")
            return
        }
        if (password.length < 8) {
            toast.warn("Passwords should be at least 8 characters")
            return
        }
        if (!equals(password, confirm_password)) {
            toast.warn("Passwords doesn't match")
            return
        }
        let data = {
            firs_tname: firstname,
            last_name: lastname,
            email: email,
            phone: phone,
            password: password,
            confirm_password: confirm_password
        }
        dispatch(registerUser(data));
    }
    const list = {
        top: '7%'
    }
    const handleChange = (event) => {
        dispatch(setEmployData(event.target.name, event.target.value));
    }

    return (
        <Widget style={list}>
            <p>CREATE ACCOUNT</p>

            <FormInput id="firstname" name="firstname" onChange={handleChange} class="form-control" type="text" placeholder="First Name" aria-required="true" />
            <FormInput id="lastname" name="lastname" onChange={handleChange} class="form-control" type="text" placeholder="Last Name" aria-required="true" />
            <FormInput id="email" name="email" onChange={handleChange} class="form-control" type="text" placeholder=" Enter Email" required="" aria-required="true" />
            <FormInput id="phone" name="phone" onChange={handleChange} class="form-control" type="text" placeholder=" Enter Phone" required="" aria-required="true" />
            <FormInput id="password" name="password" onChange={handleChange} class="form-control" type="password" placeholder="Password" required="" aria-required="true" />
            <FormInput id="confirm_password" onChange={handleChange} name="confirm_password" class="form-control" type="password" placeholder="Confirm Password" required="" aria-required="true" />

            <Button onClick={submit} label='Submit'></Button>
            <p style={{ marginTop: 5 }}>Don't have an account?<a href="./sign-in"> Login Now</a></p>
        </Widget>
    )
}
export default (SignUp)