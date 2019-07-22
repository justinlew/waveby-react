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
	}

	onOptionPress = () => {
		console.log("Edit post")
	}

	removePost(post) {
		console.log(post)
		this.props.deletePost(post)
	}

	render() {
		const date = new Date(this.props.created_by)

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="d-inline-block">
							<div>
								<img className="iconImage" src={avatar} />
							</div>
						</div>
						<div className="d-inline-block">
							<div>{this.props.author.name}</div>
							<div className="postHeaderDate">{date.toDateString()}</div>
						</div>
						
					</div>
					<div className="col">
						<span className="float-right">
							<div className="dropdown dropleft">
								<IoIosMore className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a onClick={() => this.removePost(this.props)} className="dropdown-item" href="#">Remove post</a>
								</div>
							</div>
						</span>
					</div>
				</div>
				<div>
					<p>{this.props.body}</p>
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






