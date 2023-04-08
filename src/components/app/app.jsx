import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../main/main'
import Login from '../login/login'
import Register from '../register/register'
import Navbar from '../navbar/navbar'
import './app.scss'
export default function App() {
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
