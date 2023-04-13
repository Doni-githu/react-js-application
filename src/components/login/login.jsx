import React, { useEffect, useState } from 'react'
import Input from '../../ui-components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { FailurRegister, StartLogin, SuccessLogin } from "../../slice/auth"
import Auth from "../../service/auth"
import { useNavigate } from 'react-router-dom'
import Error from '../../ui-components/Error'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(null)
    const { isLoading, isLoggedIn, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    })



    const FindUser = () => {
        if (!email || !password) {
            return
        }
        const user = {
            email: email,
            password: password
        }

        dispatch(StartLogin())
        Auth.Login(user)
            .then((res) => {
                dispatch(SuccessLogin(res.data))
                navigate("/")
                setEmail("")
                setPassword("")
            }).catch((err) => {
                dispatch(FailurRegister(err.response))
                setErr(err?.response?.data?.message)
                setEmail("")
                setPassword("")
            })
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Login</p>
            {err ? <Error error={err} setErr={setErr} /> : null}
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
