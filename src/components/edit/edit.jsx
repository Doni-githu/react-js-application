import React, { useEffect, useState } from 'react'
import '../add/add.scss'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from '../../ui-components/TextArea'
import Input from '../../ui-components/Input'
import Error from '../../ui-components/Error'
import { StartEdit, SuccessEdit, FailurEdit, StartGetDetailPost, SuccessGetDetailPost, FailurGetAllPost } from "../../slice/post"
import Post from "../../service/post"
import { useParams } from "react-router-dom"
export default function Edit() {
    const { id } = useParams()
    const state = useSelector(state => state.post)

    useEffect(() => {
        dispatch(StartGetDetailPost())
        Post.GetDetailPost(id)
            .then((res) => {
                console.log(state);
                dispatch(SuccessGetDetailPost(res.data))
            }).catch((err) => {
                dispatch(FailurGetAllPost())
            })
    }, [])



    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState({})
    const [error, setError] = useState(null)
    const dispatch = useDispatch()


    const fd = new FormData()

    fd.append('title', title)
    fd.append('body', body)
    fd.append('image', image)

    const editPost = () => {
        console.log(image);
        dispatch(StartEdit())
        Post.EditPost(id, fd)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Edit</p>
            {error ? <Error error={error} setErr={setError} /> : null}
            <form onSubmit={(e) => e.preventDefault()} className='form'>
                <Input label={"Title"} state={title} setState={setTitle} />
                <TextArea label={"Body"} state={body} setState={setBody} />
                <div className='files'>
                    <label htmlFor="files">Image</label>
                    <input type="file" id='files' style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />
                </div>
                <button className='btn btn-primary' onClick={() => editPost()}>Edit</button>
            </form>
        </div>
    )
}
