import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import _ from 'lodash'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT'

const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST'
const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS'
const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE'

const POST_USER_AVATAR_REQUEST = 'POST_USER_AVATAR_REQUEST'
const POST_USER_AVATAR_SUCCESS = 'POST_USER_AVATAR_SUCCESS'
const POST_USER_AVATAR_FAILURE = 'POST_USER_AVATAR_FAILURE'

const FETCH_USER_AVATAR_REQUEST = 'FETCH_USER_AVATAR_REQUEST'
const FETCH_USER_AVATAR_SUCCESS = 'FETCH_USER_AVATAR_SUCCESS'
const FETCH_USER_AVATAR_FAILURE = 'FETCH_USER_AVATAR_FAILURE'

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

const UPDATE_FRIEND_SUCCESS = 'UPDATE_FRIEND_SUCCESS'
const UPDATE_FRIEND_REQUEST = 'UPDATE_FRIEND_REQUEST'
const UPDATE_FRIEND_FAILURE = 'UPDATE_FRIEND_FAILURE'

const initialState = {
	isFetchingUser: false,
	isUploadingAvatar: false,
	loginError: {},
	userCreateError: {},
	user: {},
	avatar: null,
	searchedUsers: [],
	isSearchingUsers: false,
	isPasswordMismatch: false,
	isFetching: false,
	isAuthenticated: false,
	isFetchingPosts: false,
	isEdittingUser: false,
	isDeletingPost: false,
	isFetchingFriends: false,
	posts: {},
	friends: {},
	isCreatingFriend: false,
	isUpdatingFriend: false,
	isFetchingUserAvatar: false
}

const authentication = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isFetching: false,
				user: action.user,
				token: action.token,
				loginError: {}
			}
		case LOGIN_REQUEST:
			return {
				...state,
				isFetching: true,
				loginError: {}
			}
		case LOGIN_FAILURE:
			return {
				...state,
				isFetching: false,
				loginError: action.error
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
		case GET_CURRENT_USER_REQUEST:
			return {
				...state,
				isFetchingUser: true
			}
		case GET_CURRENT_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isFetchingUser: false
			}
		case GET_CURRENT_USER_FAILURE:
			return {
				...state,
				isFetchingUser: false
			}
		case USER_CREATE_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isFetching: false,
				userCreateError: {},
				user: action.user,
				token: action.token
			}
		case USER_CREATE_REQUEST:
			return {
				...state,
				isFetching: true,
				userCreateError: {}
			}
		case USER_CREATE_FAILURE:
			return {
				...state,
				isFetching: false,
				userCreateError: action.userCreateError
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
		case FETCH_USER_AVATAR_REQUEST:
			return {
				...state,
				isFetchingUserAvatar: true
			}
		case FETCH_USER_AVATAR_SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					avatar: action.avatar
				},
				isFetchingUserAvatar: false
			}
		case FETCH_USER_AVATAR_FAILURE:
			return {
				...state,
				isFetchingUserAvatar: false
			}
		case POST_USER_AVATAR_REQUEST:
			return {
				...state,
				isUploadingAvatar: true
			}
		case POST_USER_AVATAR_SUCCESS:
			return {
				...state,
				user: action.user,
				isUploadingAvatar: false
			}
		case POST_USER_AVATAR_FAILURE:
			return {
				...state,
				isUploadingAvatar: false
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
				posts: {
					...state.posts,
					[action.post._id]: action.post
				}
			}
		case FETCH_POSTS_REQUEST:
			return {
				...state,
				isFetchingPosts: true
			}
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				posts: _.mapKeys(action.posts, '_id'),
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
				posts: _.omit(state.posts, action.post._id)
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
				isFetchingFriends: false,
				friends: _.mapKeys(action.friends, '_id')
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
				friends: {
					...state.friends,
					[action.friend._id]: action.friend
				}
			}
		case CREATE_FRIENDS_FAILURE:
			return {
				...state,
				isCreatingFriend: false
			}
		case UPDATE_FRIEND_REQUEST:
			return {
				...state,
				isUpdatingFriend: true
			}
		case UPDATE_FRIEND_SUCCESS:
			return {
				...state,
				isUpdatingFriend: false,
				friends: {
					...state.friends,
					[action.friend._id]: action.friend
				}
			}
		case UPDATE_FRIEND_FAILURE:
			return {
				...state,
				isUpdatingFriend: false
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