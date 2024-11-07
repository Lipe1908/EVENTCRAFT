import axios from 'axios'

const api = axios.create({
    baseURL:"http://192.168.15.11:8085"
})

export default api