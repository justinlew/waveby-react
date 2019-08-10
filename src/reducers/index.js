import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT'

const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE'

const CREATE_POST_REQUEST = "CREATE_POST_REQUEST"
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
// const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"

const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
// const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST'
const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE'

const DELETE_POST_REQUEST = "DELETE_POST_REQUEST"
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS"
const DELETE_POST_FAILURE = "DELETE_POST_FAILURE"

const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'
const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'

const CREATE_FRIENDS_REQUEST = 'CREATE_FRIENDS_REQUEST'
const CREATE_FRIENDS_SUCCESS = 'CREATE_FRIENDS_SUCCESS'
const CREATE_FRIENDS_FAILURE = 'CREATE_FRIENDS_FAILURE'

const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'
const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST'
const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE'

const initialState = {
	user: {},
	searchedUsers: [],
	isSearchingUsers: false,
	isPasswordMismatch: false,
	isFetching: false,
	isAuthenticated: false,
	isFetchingPosts: false,
	isEdittingUser: false,
	isDeletingPost: false,
	isFetchingFriends: false,
	signUpErrors: {},
	posts: [],
	friends: [],
	isCreatingFriend: false
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
				isFetching: false,
				signUpErrors: action.signUpErrors
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
		case SEARCH_USERS_SUCCESS:
			return {
				...state,
				searchedUsers: action.searchedUsers,
				isSearchingUsers: false
			}
		case SEARCH_USERS_REQUEST:
			return {
				...state,
				isSearchingUsers: true
			}
		case SEARCH_USERS_FAILURE:
			return {
				...state,
				isSearchingUsers: false
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
		case DELETE_POST_REQUEST:
			return {
				...state,
				isDeletingPost: true
			}
		case DELETE_POST_SUCCESS:
			return {
				...state,
				isDeletingPost: false,
				posts: state.posts.slice(0).filter(post => post._id !== action.post._id)
			}
		case DELETE_POST_FAILURE:
			return {
				...state,
				isDeletingPost: false
			}
		default:
			return state
	}
}

const friend = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_FRIENDS_REQUEST:
			return {
				...state,
				isFetchingFriends: true
			}
		case FETCH_FRIENDS_SUCCESS:
			return {
				...state,
				friends: action.friends
			}
		case FETCH_FRIENDS_FAILURE:
			return {
				...state,
				isFetchingFriends: false
			}
		case CREATE_FRIENDS_REQUEST:
			return {
				...state,
				isCreatingFriend: true
			}
		case CREATE_FRIENDS_SUCCESS:
			return {
				...state,
				isCreatingFriend: false,
				friends: [...state.friends, action.friend]
			}
		case CREATE_FRIENDS_FAILURE:
			return {
				...state,
				isCreatingFriend: false
			}
		default:
			return state
	}
}

export default combineReducers({
	authentication,
	user,
	post,
	friend,
	form
})