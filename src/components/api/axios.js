import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true // envio de cookies
})

export default instance