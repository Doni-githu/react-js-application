import axios from './axios'

const Auth = {
    async Register(user) {
        const res = await axios.post('/users', { user })
        return res
    },
    async Login(user) {
        const res = await axios.post('/users/login', { user })
        return res
    }
}
export default Auth