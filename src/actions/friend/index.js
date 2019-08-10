import API from '../API'

const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'
const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'

const CREATE_FRIENDS_REQUEST = 'CREATE_FRIENDS_REQUEST'
const CREATE_FRIENDS_SUCCESS = 'CREATE_FRIENDS_SUCCESS'
const CREATE_FRIENDS_FAILURE = 'CREATE_FRIENDS_FAILURE'

const createFriendsRequest = () => {
	return {
		type: CREATE_FRIENDS_REQUEST
	}
}

const createFriendsSuccess = (friend) => {
	return {
		type: CREATE_FRIENDS_SUCCESS,
		friend
	}
}

const createFriendsFailure = () => {
	return {
		type: CREATE_FRIENDS_FAILURE
	}
}

export const createFriend = (id) => {
    return function(dispatch) {
        dispatch(createFriendsRequest)
        return API.post('/friends', {id})
            .then(function(response) {
                dispatch(createFriendsSuccess(response.data.friend))
            }).catch(function(error) {
                dispatch(createFriendsFailure)
            })
    }
}

const fetchFriendsRequest = () => {
	return {
		type: FETCH_FRIENDS_REQUEST
	}
}

const fetchFriendsSuccess = (friends) => {
	return {
		type: FETCH_FRIENDS_SUCCESS,
		friends
	}
}

const fetchFriendsFailure = () => {
	return {
		type: FETCH_FRIENDS_FAILURE
	}
}

export const fetchFriends = () => {
    return function(dispatch) {
        dispatch(fetchFriendsRequest)
        return API.get('/friends')
        .then(function (response) {
            dispatch(fetchFriendsSuccess(response.data))
        }).catch(function (error) {
            dispatch(fetchFriendsFailure)
        })
    }
}
