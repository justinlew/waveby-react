import React, { Component } from 'react'
import { IoIosMore } from 'react-icons/io'
import './styles/Post.css'

export default class Post extends Component {
	constructor(props) {
		super(props)
		this.onOptionPress = this.onOptionPress.bind(this)
	}

	onOptionPress = () => {
		console.log("Edit post")
	}

	render() {
		return (
			<div
				className="container-fluid"
			>
				<div
					className="row"
				>

					<div
						className="col-sm"
					>
						<span className="postHeaderText">{this.props.author}</span>
						<span className="postHeaderText postHeaderDate">{this.props.createdBy}</span>
					</div>
				</div>
				<div>
					<p>{this.props.body}
					</p>
				</div>
			</div>
		)
	}
}