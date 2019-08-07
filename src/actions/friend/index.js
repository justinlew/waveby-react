import API from '../API'

const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'
const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'

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
            console.log(response.data)
            dispatch(fetchFriendsSuccess(response.data))
        }).catch(function (error) {
            console.log('Error in fetching friends list: ', error.response)
            dispatch(fetchFriendsFailure)
        })
    }
}
