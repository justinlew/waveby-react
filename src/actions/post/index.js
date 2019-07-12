import {AsyncStorage} from 'react-native';
import NavigationService from '../../components/NavigationService';

const axios = require('axios')

const CREATE_POST_REQUEST = "CREATE_POST_REQUEST"
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"

const createPostRequest = () => {
	return {
		type: CREATE_POST_REQUEST
	}
}

const createPostSuccess = () => {
	return {
		type: CREATE_POST_SUCCESS
	}
}

const createPostFailure = () => {
	return {
		type: CREATE_POST_FAILURE
	}
}

export const createPost = (body) => {
	return function(dispatch) {
		dispatch(createPostRequest)
		return axios.post('http://localhost:3000/posts',
			{body}
		).then(function (response) {
			dispatch(createPostSuccess)
			NavigationService.navigate('Home')
		}).catch(function (error) {
			console.log("Error in creating a post: ", error)
			dispatch(createPostFailure)
		})
	}
}

const fetchPostsRequest = () => {
	return {
		type: FETCH_POSTS_REQUEST
	}
}

const fetchPostsSuccess = (posts) => {
	return {
		type: FETCH_POSTS_SUCCESS,
		posts
	}
}

const fetchPostsFailure = () => {
	return {
		type: FETCH_POSTS_FAILURE
	}
}

export const fetchPosts = () => {
	return function(dispatch) {
		dispatch(fetchPostsRequest())
		return axios.get("http://localhost:3000/posts")
			.then(function (response) {
				dispatch(fetchPostsSuccess(response.data))
			}).catch(function (error) {
				console.log("An error has occured when fetching user's posts ", error)
				dispatch(fetchPostsFailure())
			})
	}
}



