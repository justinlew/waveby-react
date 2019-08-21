import API from '../API'

const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'
const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'

const CREATE_FRIENDS_REQUEST = 'CREATE_FRIENDS_REQUEST'
const CREATE_FRIENDS_SUCCESS = 'CREATE_FRIENDS_SUCCESS'
const CREATE_FRIENDS_FAILURE = 'CREATE_FRIENDS_FAILURE'

const UPDATE_FRIEND_SUCCESS = 'UPDATE_FRIEND_SUCCESS'
const UPDATE_FRIEND_REQUEST = 'UPDATE_FRIEND_REQUEST'
const UPDATE_FRIEND_FAILURE = 'UPDATE_FRIEND_FAILURE'

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

const updateFriendRequest = () => {
	return {
		type: UPDATE_FRIEND_REQUEST
	}
}

const updateFriendSuccess = (friend) => {
	return {
		type: UPDATE_FRIEND_SUCCESS,
		friend
	}
}

const updateFriendFailure = () => {
	return {
		type: UPDATE_FRIEND_FAILURE
	}
}

export const updateFriend = (friend) => {
	return function(dispatch) {
		dispatch(updateFriendRequest)
		return API.put(`/friends/${friend.id}`, friend)
		.then(function (response) {
			dispatch(updateFriendSuccess(response.data))
		}).catch(function(error) {
			dispatch(updateFriendFailure)
		})
	}
}