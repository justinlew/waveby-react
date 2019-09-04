import API from './API'
import history from '../history'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
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

const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
// const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST'
const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE'

const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'
const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST'
const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE'

const fetchUserAvatarRequest = () => {
    return {
        type: FETCH_USER_AVATAR_REQUEST
    }
}

const fetchUserAvatarSuccess = (avatar) => {
    return {
        type: FETCH_USER_AVATAR_SUCCESS,
        avatar
    }
}

const fetchUserAvatarFailure = () => {
    return {
        type: FETCH_USER_AVATAR_FAILURE
    }
}

export const fetchUserAvatar = (id) => {
    return function(dispatch) {
        dispatch(fetchUserAvatarRequest())
        return API.get(`/users/${id}/avatar`)
        .then(function(response) {
            dispatch(fetchUserAvatarSuccess(response.data))
        })
        .catch(function(error) {
            dispatch(fetchUserAvatarFailure())
        })
    }
}

const postUserAvatarRequest = () => {
    return {
        type: POST_USER_AVATAR_REQUEST
    }
}

const postUserAvatarSuccess = (user) => {
    return {
        type: POST_USER_AVATAR_SUCCESS,
        user
    }
}

const postUserAvatarFailure = () => {
    return {
        type: POST_USER_AVATAR_FAILURE
    }
}

export const postUserAvatar = (avatar) => {
    console.log("avatar", avatar)
    return function(dispatch) {
        dispatch(postUserAvatarRequest())
        return API.post('/users/me/avatar', avatar, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function(response) {
            dispatch(postUserAvatarSuccess(response.data))
        })
        .catch(function(error) {
            console.log(error)
            dispatch(postUserAvatarFailure())
        })
    }
} 

const getCurrentUserRequest = () => {
    return {
        type: GET_CURRENT_USER_REQUEST
    }
}

const getCurrentUserSuccess = (user) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        user
    }
}

const getCurrentUserFailure = () => {
    return {
        type: GET_CURRENT_USER_FAILURE
    }
}

export const getCurrentUser = () => {
    return function(dispatch) {
        dispatch(getCurrentUserRequest())
        return API.get('/users/profile')
        .then(function(response) {
            dispatch(getCurrentUserSuccess(response.data))
        }).catch(function (error) {
            dispatch(getCurrentUserFailure())
        })
    }
}

const searchUsersSuccess = (searchedUsers) => {
    return {
        type: SEARCH_USERS_SUCCESS,
        searchedUsers
    }
}

const searchUsersRequest = () => {
    return {
        type: SEARCH_USERS_REQUEST
    }
}

const searchUsersFailure = () => {
    return {
        type: SEARCH_USERS_FAILURE
    }
}

export const searchUsers = (name) => {
    return function(dispatch) {
        dispatch(searchUsersRequest())
        return API.get(`/users/query/${name}`)
        .then(function(response) {
            dispatch(searchUsersSuccess(response.data))
        }).catch(function(error) {
            dispatch(searchUsersFailure())
        })
    }
}

const userEditSuccess = () => {
    return {
        type: USER_EDIT_SUCCESS
    }
}

const userEditFailure = (user) => {
    return {
        type: USER_EDIT_FAILURE,
        user
    }
}

const userEditRequest = () => {
    return {
        type: USER_CREATE_REQUEST
    }
}

export const userEdit = (user) => {
    console.log("Editting user", JSON.stringify(user))
    return function(dispatch) {
        dispatch(userEditRequest)
        return API.patch("/users/me", user)
        .then(function(response) {
            console.log(response)
            dispatch(userEditSuccess(response.data))
        }).catch(function(error) {
            console.log("Error in editing user: ", error)
            dispatch(userEditFailure)
        })
    }
}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = (user, token) => {
    return {
        type: LOGIN_SUCCESS,
        user,
        token
    }
}

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        error
    }
}

export const logoutRequest = () => {
    return {
        type: LOGOUT
    }
}

export const login = (credentials) => {
    return function(dispatch) {
        dispatch(loginRequest());
        return API.post("/users/login",
            credentials
        )
        .then(function (response) {
            dispatch(loginSuccess(response.data.user, response.data.token))
            localStorage.setItem('token', response.data.token)
            history.push('/home')
        })
        .catch(function (error) {
            dispatch(loginFailure(error.response.data))
        })
    }
}

export const logout = (user, token) => {
    return function(dispatch) {
        dispatch(logoutRequest())
        return API.post("/users/logout")
        .then(function(response) {
            localStorage.clear()
            history.push('/login')
        }).catch(function (error) {
            console.log("Failed logout", error)
        })
    }
}

export const userCreateSuccess = (user, token) => {
    return {
        type: USER_CREATE_SUCCESS,
        user,
        token
    }
}

export const userCreateFailure = (userCreateError) => {
    return {
        type: USER_CREATE_FAILURE,
        userCreateError
    }
}

export const userCreateRequest = () => {
    return {
        type: USER_CREATE_REQUEST
    }
}

export const signUp = (user) => {
    return function(dispatch) {
        dispatch(userCreateRequest());
        if (user.password !== user.passwordConfirmation) {
            dispatch(userCreateFailure({
                password: {
                    message: "Password confirmation does not match"
                }
            }))
            return Promise.resolve()
        }
        return API.post("/users", user)
        .then(function (response) {
            localStorage.setItem('token', response.data.token)
            dispatch(userCreateSuccess(response.data.user, response.data.token));
            history.push('/home')
        })
        .catch(function(error) {
            console.log('An error has occured with creating user', error.response.data.errors)
            dispatch(userCreateFailure(error.response.data.errors));
        })
    }
}