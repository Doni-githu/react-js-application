import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../main/main'
import Login from '../login/login'
import Register from '../register/register'
import Navbar from '../navbar/navbar'
import './app.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFailur, getUserStart, getUserSuccess } from '../../slice/auth'
import Auth from '../../service/auth'
export default function App() {
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getUserStart())
            Auth.getUser()
                .then((res) => {
                    dispatch(getUserSuccess(res.data))
                })
                .catch((err) => dispatch(getUserFailur(err.response)))
        }

    }, [])
    return (
        <div className='conteiner'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    )
}
