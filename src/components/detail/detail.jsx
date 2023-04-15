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
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(StartGetDetailPost())
        Post.GetDetailPost(id)
            .then((res) => {
                dispatch(SuccessGetDetailPost(res.data))
            }).catch((err) => {
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
                setText('')
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
                </div>
                <div className="right">
                    {getDate(detail.product?.createdAt) === getDate(detail.product?.updatedAt) ? <p>When updated {getDate(detail.product?.updatedAt)}</p> : <p>When created {getDate(detail.product?.createdAt)}</p>}
                    <div className="navigation">
                        <button className='btn' onClick={() => setToggle(false)}>Description</button>
                        <button className='btn' onClick={() => setToggle(true)}>Comment</button>
                    </div>
                    {toggle ?
                        <>
                            {isLoggedIn ? <form className='form2 mb-2' onSubmit={e => { e.preventDefault() }}>
                                <Input placeholder='Comment' label={"Comment"} className={'input'} setState={setText} state={text} />
                                <div className='btn'>
                                    <button className='btn btn-primary' onClick={() => makeComment(detail.product?._id)}>Send</button>
                                </div>
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
                        </> : <div className='body'>
                            <p>{detail.product?.body}</p>
                        </div>}
                </div>
            </div> : <center className='mt-5'>
                <Loader />
            </center>}

        </>
    )
}
