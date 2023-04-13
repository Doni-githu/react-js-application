import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../main/main'
import Login from '../login/login'
import Register from '../register/register'
import Navbar from '../navbar/navbar'
import './app.scss'
import { useDispatch } from 'react-redux'
import { getUserFailur, getUserStart, getUserSuccess } from '../../slice/auth'
import Auth from '../../service/auth'
import Add from '../add/add'
import Detail from '../detail/detail'
import Delete from '../delete/delete'
export default function App() {
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
                <Route path='/add' element={<Add />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/delete/:id' element={<Delete />} />
            </Routes>
        </div>
    )
}
