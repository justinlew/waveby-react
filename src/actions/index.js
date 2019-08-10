import API from './API'
import history from '../history'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'

const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE'

const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
// const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST'
const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE'

const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'
const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST'
const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE'

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
        dispatch(searchUsersRequest)
        return API.get(`/users/query/${name}`)
            .then(function(response) {
                dispatch(searchUsersSuccess(response.data))
            }).catch(function(error) {
                dispatch(searchUsersFailure)
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
                dispatch(userEditSuccess(response.data.user))
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

export const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

export const logoutRequest = () => {
    return {
        type: LOGOUT
    }
}

export const login = (credentials) => {
    return function(dispatch) {
        dispatch(loginRequest);
        return API.post("/users/login",
            credentials
            )
            .then(function (response) {
                    dispatch(loginSuccess(response.data.user, response.data.token))
                    localStorage.setItem('token', response.data.token)
                    history.push('/home')
                }
            ).catch(function (error) {
                    console.log('An error has occured with the authentication', error)
                    dispatch(loginFailure)
                }
            )
    }
}

export const logout = (user, token) => {
    console.log("Logging out")
    return function(dispatch) {
        dispatch(logoutRequest)
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

export const userCreateFailure = (signUpErrors) => {
    return {
        type: USER_CREATE_FAILURE,
        signUpErrors
    }
}

export const userCreateRequest = () => {
    return {
        type: USER_CREATE_REQUEST
    }
}

export const signUp = (user) => {
    return function(dispatch) {
        dispatch(userCreateRequest);
        return API.post("/users",
                user
            )
            .then(function (response) {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                dispatch(userCreateSuccess(response.data.user, response.data.token));
                history.push('/home')
            })
            .catch(function(error) {
                    console.log('An error has occured with creating user', error)
                    dispatch(userCreateFailure(error.errors));
                }
            )
    }
}

