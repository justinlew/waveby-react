import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import PostList from './PostList'


import Friend from './Friend'
import HomeNavBar from './HomeNavBar'

import { fetchFriends } from '../actions/friend'
import UserList from './UserList'
import './styles/Post.css'

class Home extends Component {

	componentDidMount() {
		this.props.fetchFriends()
	}

	render() {
		const { friends } = this.props

		const friendsListItems = friends.map((friend) => {
			let bIsUserSource = this.props.user._id === friend.user._id
			let oFriend = bIsUserSource ? friend.user : friend.friend
			return (
				<Friend {...oFriend}/> 
			)
		})

		return (
			<div>
				<HomeNavBar />
				<div className="container mt-4">
					<div className="row">
						<div className="col">

						</div>
						<div className="col-10">
							<Route exact path="/home" component={PostList} />
							<Route path="/home/searchUsers" component={UserList} />
						</div>
						<div className="col">

						</div>
					</div>
				</div>
				<div className="friend-container dropdown">
					<button className="btn btn-lg dropdown-toggle friend-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Friends
					</button>
					<div class="dropdown-menu dropdown-menu-friends" aria-labelledby="dropdownMenuButton">
						{friendsListItems}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { user, token } = state.authentication
	const { isFetchingFriends, friends } = state.friend
	return { user, token, isFetchingFriends, friends }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchFriends
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)