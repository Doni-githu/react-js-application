import React, { useEffect } from 'react'
import './main.scss'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../service/post'
import { SuccessGetAllPost, StartGetAllPost, StartGetDetailPost, SuccessGetDetailPost, FailurGetAllPost } from "../../slice/post"
import { useNavigate } from 'react-router-dom'
import Loader from '../../ui-components/Loader'
export default function Main() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(StartGetAllPost())
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

    const EditPost = (id) => {
        dispatch(StartGetDetailPost())
        Post.GetDetailPost(id).then((res) => {
            navigate(`/edit/${id}`)
            dispatch(SuccessGetDetailPost(res.data)) 
        }).catch((err) => {
            console.log(err)
            dispatch(FailurGetAllPost())
        })
    }

    return (
        <div className="flex">
            {state.post.data ? state.post.data.map((item, idx) => (
                <div className="colomn" key={idx}>
                    <div className="card shadow-sm">
                        <img src={item.src} alt="Image" />
                        <div className="card-body">
                            <p className="card-text">{item.title}</p>
                            <p>Author: {item.user.username}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => goToDetail(item._id)}>Detail</button>
                                    {state?.auth?.user?.user?._id === item.user._id ? <>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deletePost(item._id)}>Delete</button>
                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => EditPost(item._id)}>Edit</button>
                                    </> : null}
                                </div>
                                <small className="text-body-secondary">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
            )) :
                <Loader />
            }
        </div>
    )
}
