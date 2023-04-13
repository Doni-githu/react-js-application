import React, { useEffect, useState } from 'react'
import Input from '../../ui-components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { FailurRegister, StartRegister, SuccessRegister } from '../../slice/auth'
import Auth from "../../service/auth"
import { useNavigate } from 'react-router-dom'
import Error from '../../ui-components/Error'

export default function Register() {
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const { isLoading, isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [])

    const FindUser = async () => {
        if (!email || !password) {
            return
        }
        const user = {
            name: nickname,
            email: email,
            password: password
        }
        dispatch(StartRegister())
        Auth.Register(user)
            .then((res) => {
                dispatch(SuccessRegister(res.data))
                setEmail("")
                setNickname("")
                setPassword("")
                navigate("/")
            }).catch((err) => {
                setError(err?.response?.data?.message)
                dispatch(FailurRegister(err.response))
            })
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Register</p>
            {error ? <Error error={error} setErr={setError} /> : null}
            <form onSubmit={(e) => e.preventDefault()}>
                <Input label={"Nickname"} state={nickname} setState={setNickname} />
                <Input label={"Email"} type={"email"} state={email} setState={setEmail} />
                <Input label={"Password"} type={"password"} state={password} setState={setPassword} />
                <button type='submit' className='btn btn-primary' onClick={() => FindUser()} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Register'}
                </button>
            </form>
        </div>
    )
}
