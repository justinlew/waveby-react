import axios from 'axios'

const development = process.env.NODE_ENV !== 'production'

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("Is development ", development)

const API = axios.create({
    baseURL: development ? "http://localhost:3000" : "https://mighty-waters-11379.herokuapp.com"
})

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        console.log(config)
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
})

export default API