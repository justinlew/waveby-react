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
						<button className="btn btn-secondary" type="submit" onClick={this.logout}>Logout</button>
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