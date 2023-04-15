import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StartDelete } from '../../slice/post'
import Post from '../../service/post'
import { useDispatch, useSelector } from 'react-redux'

import './delete.scss'

export default function Delete() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.post)
    const ReallyDelete = () => {
        dispatch(StartDelete())
        Post.DeletePost(id)
            .then((res) => {
                navigate('/')
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='center'>
            <div className="center-conteiner">
                <h1 className='text-danger'>Really delete?</h1>
                <div className='gruop'>
                    <button className='btn btn-danger' onClick={() => ReallyDelete()} disabled={isLoading}>Delete</button>
                    <button className='btn btn-success' onClick={() => navigate('/')}>back</button>
                </div>
            </div>
        </div>
    )
}
