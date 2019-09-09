import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import CreatePostForm from './CreatePostForm'
import { fetchPosts } from '../actions/post'
import { getCurrentUser } from '../actions'
import Post from './Post'

class PostList extends React.Component {

	componentDidMount() {
		this.props.fetchPosts()
		this.props.getCurrentUser()
	}

	render() {
		let { posts } = this.props
		posts = _.orderBy(posts, ['created_by'], ['asc'])
		const listItems = posts.slice(0).reverse().map((post) => {
			console.log(this.props.user._id.toString() === post.author._id.toString())
			const isUserAuthor = this.props.user._id.toString() === post.author._id.toString()
			return (
				<li className="mb-2">
					<div>
						<Post {...post} isUserAuthor={isUserAuthor}/>
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
	const { isFetchingUser, user } = state.user
	const { posts, isPosting, isFetchingPosts, isDeletingPost } = state.post
	return { isFetchingUser, user, posts, isPosting, isFetchingPosts, isDeletingPost }
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchPosts,
	getCurrentUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostList)