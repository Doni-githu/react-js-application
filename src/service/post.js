import axios from "./axios";

const Post = {
    AddPost(fd) {
        return axios.post('/article/add', fd)
    },
    GetAllPost() {
        return axios.get('/article')
    }
}

export default Post