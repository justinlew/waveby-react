import axios from 'axios'
import history from '../history'

const development = process.env.NODE_ENV !== 'production'

const API = axios.create({
    baseURL: development ? "http://localhost:3000" : "https://mighty-waters-11379.herokuapp.com"
})

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
})

API.interceptors.response.use((response) =>  {
	return response
}, (error) => {
	console.log("Error with axios interceptor", error)
	if (error && error.response && error.response.status === 401) {
		return Promise.reject(
			history.push('/login')
		);
	}
})

export default API