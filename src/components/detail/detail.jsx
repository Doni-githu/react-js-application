import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StartGetDetailPost, SuccessGetDetailPost, FailurGetAllPost, StartCommented, SuccessCommented, FailurCommented } from "../../slice/post"
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"
import Post from "../../service/post"
import './detail.scss'
import Input from "../../ui-components/Input"
import Loader from '../../ui-components/Loader'
export default function Detail() {
    const { id } = useParams()
    const [text, setText] = useState('')
    const { detail, comments } = useSelector(state => state.post)
    const { isLoggedIn } = useSelector(state => state.auth)
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

    function makeComment(id) {
        const data = {
            text: text,
            postId: id,
        }
        dispatch(StartCommented())
        Post.CommentPost(data)
            .then((res) => {
                dispatch(SuccessCommented(res.data.comments))
                console.log(res.data.comments);
            }).catch((err) => {
                dispatch(FailurCommented())
            })
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
                    {isLoggedIn ? <form onSubmit={e => { e.preventDefault() }}>
                        <Input placeholder='Comment' label={"Comment"} setState={setText} state={text} />
                        <button className='btn btn-primary' type='submit' onClick={() => makeComment(detail.product?._id)}>
                            Send
                        </button>
                    </form> : null}
                    <ul className='comments'>
                        {comments ? comments.map((item, idx) => (
                            <li key={idx}>
                                <strong>{item.postedBy.username}</strong>
                                <p>{item.text}</p>
                            </li>
                        )) : <>
                            {detail.product?.comments.map((item, idx) => (
                                <li key={idx}>
                                    <strong>{item.postedBy.username}</strong>
                                    <p>{item.text}</p>
                                </li>
                            ))}
                        </>}
                    </ul>
                </div>
            </div> : <center className='mt-5'>
                <Loader />
            </center>}

        </>
    )
}
