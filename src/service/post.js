import axios from "./axios";

const Post = {
    AddPost(fd) {
        return axios.post('/article/add', fd)
    },
    GetAllPost() {
        return axios.get('/article')
    },
    GetDetailPost(id) {
        return axios.get(`/article/${id}`)
    },
    DeletePost(id) {
        return axios.delete(`/article/${id}`)
    }
}

export default Post