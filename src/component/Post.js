import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IoIosMore } from 'react-icons/io'
import avatar from './public/avatar.png'
import './styles/Post.css'

import { deletePost } from '../actions/post'

class Post extends Component {
	constructor(props) {
		super(props)
		this.onOptionPress = this.onOptionPress.bind(this)
		this.removePost = this.removePost.bind(this)
		this.renderAvatar = this.renderAvatar.bind(this)
	}

	onOptionPress = () => {
		console.log("Edit post")
	}

	removePost(post) {
		this.props.deletePost(post)
	}

	renderAvatar() {
        if (!this.props.author.avatar) {
            return avatar
        } else {
            return `data:image/jpg;base64,${this.props.author.avatar}`
        }
    }

	render() {
		const date = new Date(this.props.created_by)
		const isUserAuthor = this.props.isUserAuthor
		return (
			<div className="container-fluid rounded-lg pt-2 pb-2" id="post-container">
				<div className="row">
					<div className="col">
						<div className="d-inline-block">
							<img className="iconImage m-1" src={this.renderAvatar()} alt="Avatar icon"/>
						</div>
						<div className="d-inline-block">
							<b>{this.props.author.name}</b>
							<p className="postHeaderDate mb-0">{date.toDateString()}</p>
						</div>
						
					</div>
					<div className="col">
						<div className="btn-group dropleft float-right">
							<button type="button" className="btn btn-outline-secondary border-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<IoIosMore />
							</button>
							<div className="dropdown-menu">
								{isUserAuthor ? <a href="#" onClick={() => this.removePost(this.props)} className="dropdown-item">Remove post</a> : undefined}
							</div>
						</div>
					</div>
				</div>
				<div>
					<span id="post-body">{this.props.body}</span>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: post => dispatch(deletePost(post)) 
    }
}

export default connect(undefined, mapDispatchToProps)(Post)






