import axios from 'axios'
import history from '../history'

const development = process.env.NODE_ENV !== 'production'

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("Is development ", development)

axios.interceptors.request.use(
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

axios.interceptors.response.use((response) =>  {
	return response
}, (error) => {
	console.log("Error with axios interceptor", error)
	if (error && error.response && error.response.status === 401) {
		return Promise.reject(
			history.push('/login')
		);
	}
})

const API = axios.create({
    baseURL: development ? "http://localhost:3000" : "https://mighty-waters-11379.herokuapp.com"
})



export default API