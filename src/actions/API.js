import axios from 'axios'
import { createConfigItem } from '@babel/core';

const development = process.env.NODE_ENV !== 'production'

const http = axios.create({
    baseURL: development ? "http://localhost:3000" : "https://mighty-waters-11379.herokuapp.com"
})

http.interceptors.request.use(
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

export default http