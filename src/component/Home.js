import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import PostList from './PostList'
import Post from './Post'
import CreatePostForm from './CreatePostForm'
import { fetchPosts } from '../actions/post'

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
				<li>
					<div className="card">
						<Post {...post}/> 
					</div>
				</li>
			);
		})
		return (
			<div>
				<CreatePostForm />
				<ul className="list-group">{listItems}</ul>
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