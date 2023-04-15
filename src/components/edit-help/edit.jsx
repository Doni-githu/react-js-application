import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './edit.scss'
import Post from '../../service/post'
import { FailurGetEditerPost, StartGetEditerPost, SuccessGetEditerPost } from '../../slice/post'

export default function EditHelpers() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const goToEdit = (id) => {
        dispatch(StartGetEditerPost())
        Post.GetEditerPost(id)
            .then((res) => {
                dispatch(SuccessGetEditerPost(res.data.product))
                navigate(`/edit/${id}`)
            }).catch((err) => {
                dispatch(FailurGetEditerPost(err.response))
                console.log(err)
            })
    }

    return (
        <div className='center'>
            <div className="center-conteiner">
                <h1 className='text-danger'>Really Edit?</h1>
                <p>If you want to edit your product, you must change the product image</p>
                <div className='gruop'>
                    <button className='btn btn-danger' onClick={() => goToEdit(id)} disabled={isLoading}>Edit</button>
                    <button className='btn btn-success' onClick={() => navigate('/')}>back</button>
                </div>
            </div>
        </div>
    )
}
