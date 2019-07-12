import axios from 'axios'
import NavigationService from '../components/NavigationService'

axios.interceptors.response.use((response) =>  {
	return response
}, (error) => {
	console.log("Error with axios interceptor", error)
	if (error && error.response && error.response.status === 401) {
		return Promise.reject(
			NavigationService.navigate("Login")
		);
	}
})