import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import $ from 'jquery'
// import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { styles } from './common/styles'
import { userEdit, getCurrentUser } from '../actions'
import { bindActionCreators } from 'redux';

import ChangeAvatar from './ChangeAvatar'

const required = value => value ? undefined : 'Required'

class EditProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.user.name,
			email: props.user.email,
			displayName: props.user.displayName
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onChangeProfilePhoto = this.onChangeProfilePhoto.bind(this)
		this.onDonePress = this.onDonePress.bind(this)
	}

	componentDidMount() {
		this.props.getCurrentUser()
	}

	onChangeProfilePhoto = () => {
		console.log("Changing profile photo")
	}

	onDonePress = (event) => {
		event.preventDefault()
		this.props.userEdit(this.state)
	}

	onSubmit() {
		this.props.userEdit(this.state)
	}

	render() {
	
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="text-secondary" for="name">Name</label>
						<input 
							onChange={event => this.setState({name: event.target.value})}
							name="name"
							label="Name"
							type="text"
							value={this.state.name}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label className="text-secondary" for="displayName">Display Name</label>
						<input 
							onChange={event => this.setState({displayName: event.target.value})}
							name="displayName"
							label="Display Name"
							type="text"
							value={this.state.displayName}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label className="text-secondary" for="email">Email</label>
						<input 
							onChange={event => this.setState({email: event.target.value})}
							name="email"
							label="Email"
							type="text"
							value={this.state.email}
							className="form-control"
						/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={this.onDonePress}>Done</button>
				</form>
				<div className="my-5">
					<ChangeAvatar />
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { isFetchingUser, user } = state.user
	return { user, isFetchingUser }
}
const mapDispatchToProps = dispatch => bindActionCreators({
	getCurrentUser,
	userEdit
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)