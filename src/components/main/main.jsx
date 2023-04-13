import React, { useEffect } from 'react'
import './main.scss'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../service/post'
import { SuccessGetAllPost, StartGetAllPost } from "../../slice/post"
export default function Main() {
    const state = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        StartGetAllPost()
        Post.GetAllPost()
            .then((res) => dispatch(SuccessGetAllPost(res.data)))
    }, [])

    return (
        <div className="flex">
            {state.data ? state.data.map((item) => (
                <div className="colomn">
                    <div className="card shadow-sm">
                        <img src={item.src} alt="Image" />
                        <div className="card-body">
                            <p className="card-text">{item.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Detail</button>
                                    <button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                                    <button type="button" className="btn btn-sm btn-outline-primary">Edit</button>
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
