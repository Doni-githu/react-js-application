import React, { useEffect, useState } from 'react'
import './main.scss'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../service/post'
import { SuccessGetAllPost, StartGetAllPost, StartDelete } from "../../slice/post"
import { useNavigate } from 'react-router-dom'
export default function Main() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        StartGetAllPost()
        Post.GetAllPost()
            .then((res) => {
                dispatch(SuccessGetAllPost(res.data))
            })
    }, [])

    const goToDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    const deletePost = (id) => {
        navigate(`/delete/${id}`)
    }

    // setId(state.auth.user.user._id)

    return (
        <div className="flex">
            {state.post.data ? state.post.data.map((item, idx) => (
                <div className="colomn" key={idx}>
                    <div className="card shadow-sm">
                        <img src={item.src} alt="Image" />
                        <div className="card-body">
                            <p className="card-text">{item.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => goToDetail(item._id)}>Detail</button>
                                    {state?.auth?.user?.user?._id === item.user ? <>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deletePost(item._id)}>Delete</button>
                                        <button type="button" className="btn btn-sm btn-outline-primary">Edit</button>
                                    </> : null}
                                </div>
                                <small className="text-body-secondary">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
            )) :
                <center>
                    <p className='fs-1'>Loading...</p>
                </center>
            }
        </div>
    )
}
