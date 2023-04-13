import React, { useState } from 'react'
import Input from '../../ui-components/Input'
import axios from '../../service/axios'
import Post from '../../service/post'
import { useNavigate } from 'react-router-dom'

export default function Add() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState({})
    const [src, setSrc] = useState('')
    const navigate = useNavigate()
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {

            const fr = new FileReader()

            fr.readAsDataURL(file)

            fr.onload = () => {
                resolve(fr.result)
            }

            fr.onerror = (err) => {
                reject(err)
            }
        })
    }
    const addPost = async () => {
        if (!title || !body || !image) {
            return
        }
        const fd = new FormData();


        fd.append('title', title)
        fd.append('body', body)
        fd.append('image', image)

        Post.AddPost(fd)
            .then((res) => {
                setSrc(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='w-50 text-center mx-auto'>
            <p className='fs-1'>Add</p>
            <form onSubmit={(e) => e.preventDefault()} className='form'>
                <Input label={"Title"} state={title} setState={setTitle} />
                <Input label={"Body"} state={body} setState={setBody} />
                <div>
                    <label htmlFor="files">Image</label>
                    <input type="file" id='files' style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />
                </div>
                <button className='btn btn-primary' onClick={() => addPost()}>Add</button>
            </form>
        </div>
    )
}
