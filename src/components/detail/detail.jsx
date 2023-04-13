import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StartGetDetailPost, SuccessGetDetailPost, FailurGetAllPost } from "../../slice/post"
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"
import Post from "../../service/post"
import './detail.scss'
export default function Detail() {
    const { id } = useParams()
    const { detail } = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(StartGetDetailPost())
        Post.GetDetailPost(id)
            .then((res) => {
                dispatch(SuccessGetDetailPost(res.data))
            }).catch((err) => {
                console.log(err);
                dispatch(FailurGetAllPost())
            })
    }, [])

    function getDate(date) {
        return moment(date).format("DD MMM YYYY")
    }
    return (
        <>
            {detail ? <div className='content'>
                <div className="left" >
                    <div className='image'>
                        <img src={detail.product?.src} alt="Image" />
                    </div>
                    <div className='title'>
                        <p>{detail.product?.title}</p>
                    </div>
                    <div className='body'>
                        <p>{detail.product?.body}</p>
                    </div>
                </div>
                <div className="right">
                    <p>When created {getDate(detail.product?.createdAt)}</p>
                    {getDate(detail.product?.createdAt) !== getDate(detail.product?.updatedAt) ? <p>When updated {getDate(detail.product?.updatedAt)}</p> : null}
                </div>
            </div> : <center>
                <p>Loading...</p>
            </center>}

        </>
    )
}
