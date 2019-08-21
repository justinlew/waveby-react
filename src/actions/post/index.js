// import {AsyncStorage} from 'react-native';
// import NavigationService from '../../components/NavigationService';
import { reset } from 'redux-form'
import API from '../API'

const CREATE_POST_REQUEST = "CREATE_POST_REQUEST"
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"

const DELETE_POST_REQUEST = "DELETE_POST_REQUEST"
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS"
const DELETE_POST_FAILURE = "DELETE_POST_FAILURE"

const createPostRequest = () => {
	return {
		type: CREATE_POST_REQUEST
	}
}

const createPostSuccess = (post) => {
	return {
		type: CREATE_POST_SUCCESS,
		post
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
		return API.post('/posts',
			{body}
		).then(function (response) {
			console.log(response.data)
			dispatch(createPostSuccess(response.data))
			dispatch(reset("create-post-form"))
			// NavigationService.navigate('Home')
		}).catch(function (error) {
			console.log("Error in creating a post: ", error.response)
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
		return API.get("/posts")
			.then(function (response) {
				dispatch(fetchPostsSuccess(response.data))
			}).catch(function (error) {
				dispatch(fetchPostsFailure())
			})
	}
}

const deletePostRequest = () => {
	return {
		type: DELETE_POST_REQUEST
	}
}

const deletePostSuccess = (post) => {
	return {
		type: DELETE_POST_SUCCESS,
		post
	}
}

const deletePostFailure = () => {
	return {
		type: DELETE_POST_FAILURE
	}
}

export const deletePost = (post) => {
	console.log("Deleting post", post)
	return function(dispatch) {
		dispatch(deletePostRequest)
		return API.delete(`/posts/${post._id}`)
			.then(function(response) {
				console.log(response)
				dispatch(deletePostSuccess(response.data))
			}).catch(function(error) {
				console.log("An error has occured when deleting a post", error)
				dispatch(deletePostFailure)
			})
	}
}
