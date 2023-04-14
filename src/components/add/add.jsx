import React, { useState } from 'react'
import Input from '../../ui-components/Input'
import Post from '../../service/post'
import { useNavigate } from 'react-router-dom'
import Error from "../../ui-components/Error"
import { FailurGetAllPost, StartGetAllPost, SuccessGetAllPost } from '../../slice/post'
import './add.scss'
import TextArea from '../../ui-components/TextArea'
export default function Add() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState({})
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const addPost = async () => {
        if (!title || !body || !image) {
            setError("All fields are required")
            return
        }
        const fd = new FormData();


        fd.append('title', title)
        fd.append('body', body)
        fd.append('image', image)
        StartGetAllPost()
        Post.AddPost(fd)
            .then((res) => {
                console.log(res.data);
                SuccessGetAllPost(res.data)
                navigate('/')
            })
            .catch(err => {
                FailurGetAllPost()
                console.log(err?.response)
            })
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Add</p>
            {error ? <Error error={error} setErr={setError} /> : null}
            <form onSubmit={(e) => e.preventDefault()} className='form'>
                <Input label={"Title"} state={title} setState={setTitle} />
                <TextArea label={"Body"} state={body} setState={setBody} />
                <div className='files'>
                    <label htmlFor="files">Image</label>
                    <input type="file" id='files' style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />
                </div>
                <button className='btn btn-primary' onClick={() => addPost()}>Add</button>
            </form>
        </div>
    )
}
