import axios from "axios";

axios.defaults.baseURL = "https://node-js-express-api.onrender.com/api"

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    const authorization = token ? token : ''
    config.headers.Authorization = authorization
    return config
})

export default axios