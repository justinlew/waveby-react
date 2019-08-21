import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Link, withRouter } from 'react-router-dom'

import PostList from './PostList'
import Friend from './Friend'
import HomeNavBar from './HomeNavBar'
import Conversation from './Conversation'
import history from '../history'

import { getCurrentUser } from '../actions'
import { fetchFriends, updateFriend } from '../actions/friend'
import UserList from './UserList'
import './styles/Post.css'

class Home extends Component {
	constructor(props) {
		super(props)
		this.handleFriendClick = this.handleFriendClick.bind(this)
		this.handleRequestIconClick = this.handleRequestIconClick.bind(this)
	}

	componentDidMount() {
		this.props.fetchFriends()
		this.props.getCurrentUser()
	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.friends) !== JSON.stringify(this.props.friends)) {
			this.props.fetchFriends()
		}
	}

	handleFriendClick(conversation) {
		history.push(`/home/conversation/${conversation}`)
	}

	handleRequestIconClick(friend) {
		this.props.updateFriend({
			id: friend.id,
			status: "accepted"
		})
	}

	render() {
		let { friends } = this.props
		friends = Object.values(friends)
		let friendsListItems = friends.filter((friend) => {
			if (friend.status === "accepted") {
				return true
			}
			return false
		}).map(friend => {
			let bIsUserSource = this.props.user._id === friend.user._id
			let oFriend = bIsUserSource ? friend.friend : friend.user
			let conversation = friend.conversation
			return (<Link to={`/home/conversation/${conversation}`}><Friend {...oFriend} conversation={conversation} status={friend.status} isSourceUser={bIsUserSource}/></Link>)
		})
		let requestedFriendsListItems = friends.filter((friend) => {
			if (friend.status === "requested") {
				return true
			}
			return false
		}).map(friend => {
			let bIsUserSource = this.props.user._id === friend.user._id
			let oFriend = bIsUserSource ? friend.friend : friend.user
			let conversation = friend.conversation
			return (<Friend {...oFriend} conversation={conversation} status={friend.status} isSourceUser={bIsUserSource} id={friend._id} onIconClick={this.handleRequestIconClick} />)
		})

		let friendDropdown
		if (friends) {
			friendDropdown = (
				<div className="dropdown-menu dropdown-menu-friends" aria-labelledby="dropdownMenuButton">
					{requestedFriendsListItems.length > 0 ? <div className="dropdown-header-friend">Friend requests</div> : undefined}
					{requestedFriendsListItems}
					{friendsListItems.length > 0 ? <div className="dropdown-header-friend">Friends</div> : undefined}
					{friendsListItems}
				</div>
			)
		}

		return (
			<div>
				<HomeNavBar />
				<div className="container mt-4">
					<div className="row">
						<div className="col">

						</div>
						<div className="col-10">
							<Route exact path="/home" component={PostList} />
							<Route path="/home/searchUsers/:query" component={UserList} />
							<Route path="/home/conversation/:id" component={withRouter(Conversation)} />
						</div>
						<div className="col">

						</div>
					</div>
				</div>
				<div className="friend-container border border-secondary dropdown">
					<button className="btn btn-lg dropdown-toggle friend-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Friends
					</button>
					{friendDropdown}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { isFetchingUser, user } = state.user
	const { token } = state.authentication
	const { isFetchingFriends, friends, isUpdatingFriend } = state.friend
	return { user, token, isFetchingFriends, friends, isUpdatingFriend, isFetchingUser }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchFriends,
	updateFriend,
	getCurrentUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)