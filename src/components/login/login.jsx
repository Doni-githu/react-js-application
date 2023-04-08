import React, { useState } from 'react'
import Input from '../../ui-components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { FailurRegister, StartLogin, SuccessLogin } from "../../slice/auth"
import Auth from "../../service/auth"
import { useNavigate } from 'react-router-dom'
import Error from '../../ui-components/Error'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const FindUser = () => {
        if (!email || !password) {
            // dispatch(FailurRegister("All fields are required"))  
            return
        }
        const user = {
            email: email,
            password: password
        }

        dispatch(StartLogin())
        Auth.Login(user)
            .then((res) => {
                console.log(res.data);
                dispatch(SuccessLogin(res.data))
                navigate("/")
                setEmail("")
                setPassword("")
            }).catch((err) => {
                dispatch(FailurRegister(err.response))
                setEmail("")
                setPassword("")
            })
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Login</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <Input label={"Email"} type={"email"} state={email} setState={setEmail} />
                <Input label={"Password"} type={"password"} state={password} setState={setPassword} />
                <button type='submit' className='btn btn-primary' disabled={isLoading} onClick={() => FindUser()}>
                    {isLoading ? "Loading..." : 'Login'}
                </button>
            </form>
        </div>
    )
}
