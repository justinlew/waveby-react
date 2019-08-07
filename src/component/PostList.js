import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreatePostForm from './CreatePostForm'
import { fetchPosts } from '../actions/post'
import Post from './Post'

class PostList extends React.Component {

	componentDidMount() {
		console.log("HIHIHIHI")
		this.props.fetchPosts()
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
		return (
			<div>
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
	fetchPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostList)