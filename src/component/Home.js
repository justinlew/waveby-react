import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import { FaCaretDown } from 'react-icons/fa'
import PostList from './PostList'
import avatar from './public/avatar.png'

import Post from './Post'
import Friend from './Friend'
import CreatePostForm from './CreatePostForm'
import { fetchPosts } from '../actions/post'
import './styles/Post.css'

class Home extends Component {

	PostListItem(props) {
		return (
			<li>
				{props.value}
			</li>
		)
	}

	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}

	logout = () => {
		this.props.logout()
	}

	componentDidMount() {
		this.props.fetchPosts()
	}

	NoPosts(props) {
		return (
			<li className="mb-2">
				<div>
					<div className="container-fluid rounded-lg pt-2 pb-1" id="post-container">
						<p>Hey, I see you have no posts with us!</p>
						<p>You can type stuff in the input above and click submit to get started :)</p>
					</div>
				</div>
			</li>
		)
	}

	render() {
		const { posts } = this.props
		const listItems = posts.slice(0).reverse().map((post) => {
			return (
				<li className="mb-2">
					<div>
						<Post {...post}/> 
					</div>
				</li>
			);
		})

		console.log(listItems)
		return (
			<div>
				<nav className="navbar navbar-expand-lg justify-content-between" id="navbar-gradient">
					<div className="navbar-brand" id="waveby-title"><b>Waveby</b></div>
					<div className="my-2 my-lg-0" id="navbarSupportedContent">
						<div className="btn-group">
							<button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img className="iconImage" alt="Profile picture" src={avatar} />
							</button>
							<div className="dropdown-menu dropdown-menu-right">
								<a className="dropdown-item" onClick={this.logout}>Logout</a>
							</div>
						</div>
					</div>
				</nav>
				<div className="container mt-4">
					<div className="row">
						<div className="col">
						</div>
						<div className="col-10">
							<CreatePostForm />
							<ul className="list-group" id="post-list">{listItems}</ul>
						</div>
						<div className="col">
							<div className="friend-container dropdown">
								<button className="btn btn-lg dropdown-toggle friend-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Friends
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<Friend />
									<Friend />
									<Friend />
									<Friend />
									<Friend />
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { user, token } = state.authentication
	const { posts, isPosting, isFetchingPosts, isDeletingPost } = state.post
	return { user, token, posts, isPosting, isFetchingPosts, isDeletingPost }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchPosts,
	logout
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Home)