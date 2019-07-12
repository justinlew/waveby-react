import { combineReducers } from 'redux'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT'

const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE'

const CREATE_POST_REQUEST = "CREATE_POST_REQUEST"
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"

const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST'
const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE'


const initialState = {
	user: {},
	isFetching: false,
	isAuthenticated: false,
	isFetchingPosts: false,
	isEdittingUser: false,
	posts: []
}

const authentication = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isFetching: false,
				user: action.user,
				token: action.token
			}
		case LOGIN_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case LOGIN_FAILURE:
			return {
				...state,
				isFetching: false
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false
			}
		default:
			return state
	}
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case USER_CREATE_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isFetching: false,
				user: action.user,
				token: action.token
			}
		case USER_CREATE_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case USER_CREATE_FAILURE:
			return {
				...state,
				isFetching: false
			}
		case USER_EDIT_FAILURE: 
			return {
				...state,
				isEdittingUser: false
			}
		case USER_EDIT_SUCCESS:
			return {
				...state,
				isEdittingUser: false,
				user: action.user
			}
		case USER_CREATE_REQUEST:
			return {
				...state,
				isEdittingUser: true
			}
		default:
			return state
	}
}

const post = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST_REQUEST:
			return {
				...state,
				isPosting: true
			}
		case CREATE_POST_SUCCESS:
			return {
				...state,
				isPosting: false,
				posts: [...state.posts, action.post]
			}
		case FETCH_POSTS_REQUEST:
			return {
				...state,
				isFetchingPosts: true
			}
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				posts: action.posts,
				isFetchingPosts: false
			}
		case FETCH_POSTS_FAILURE:
			return {
				...state,
				isFetchingPosts: false
			}
		default:
			return state
	}
}

export default combineReducers({
	authentication,
	user,
	post
})