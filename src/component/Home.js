import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import PostList from './PostList'
import Post from './Post'
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

	// componentDidUpdate() {
	// 	this.props.fetchPosts()
	// }

	render() {
		const { posts } = this.props
		const listItems = posts.slice(0).reverse().map((post) => {
			return (
				<li className="mb-2">
					<div className="card">
						<Post {...post}/> 
					</div>
				</li>
			);
		})
		return (

			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">Waveby</a>
					<div className="collapse navbar-collapse my-2 my-lg-0 justify-content-end" id="navbarSupportedContent">	
						<button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={this.logout}>Logout</button>
					</div>
				</nav>
				<CreatePostForm />
				<ul className="list-group" id="post-list">{listItems}</ul>
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