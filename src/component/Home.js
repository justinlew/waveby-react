import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'

import PostList from './PostList'
import Friend from './Friend'
import HomeNavBar from './HomeNavBar'
import Conversation from './Conversation'
import history from '../history'

import { fetchFriends } from '../actions/friend'
import UserList from './UserList'
import './styles/Post.css'

class Home extends Component {
	constructor(props) {
		super(props)
		this.handleFriendClick = this.handleFriendClick.bind(this)
	}

	componentDidMount() {
		this.props.fetchFriends()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.friends.length !== this.props.friends.length) {
			this.props.fetchFriends()
		}
	}

	handleFriendClick(conversation) {
		console.log(conversation)
		history.push(`/home/conversation/${conversation}`)
	}

	render() {
		const { friends } = this.props
		console.log("friends props: ", friends)

		const friendsListItems = friends.map((friend) => {
			let bIsUserSource = this.props.user._id === friend.user._id
			let oFriend = bIsUserSource ? friend.user : friend.friend
			let conversation = friend.conversation
			return (
				<Friend {...oFriend} conversation={conversation} onClick={this.handleFriendClick}/> 
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
							<Route path="/home/searchUsers/:query" component={UserList} />
							<Route path="/home/conversation/:id" component={Conversation} />
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