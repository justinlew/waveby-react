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
        if (!this.props.author) {
            return avatar
        } else {
            return `data:image/jpg;base64,${this.props.author.avatar}`
        }
    }

	render() {
		const date = new Date(this.props.created_by)
		return (
			<div className="container-fluid rounded-lg pt-2 pb-1" id="post-container">
				<div className="row">
					<div className="col">
						<div className="d-inline-block">
							<div>
								<img className="iconImage" src={this.renderAvatar()} alt="Avatar icon"/>
							</div>
						</div>
						<div className="d-inline-block">
							<b>{this.props.author.name}</b>
							<p className="postHeaderDate">{date.toDateString()}</p>
						</div>
						
					</div>
					<div className="col">
						<span className="float-right">
							<div className="dropdown dropleft">
								<IoIosMore className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a href="#" onClick={() => this.removePost(this.props)} className="dropdown-item">Remove post</a>
								</div>
							</div>
						</span>
					</div>
				</div>
				<div>
					<span id="post-body">{this.props.body}</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
});


const mapDispatchToProps = dispatch => {
    return {
        deletePost: post => dispatch(deletePost(post)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)






