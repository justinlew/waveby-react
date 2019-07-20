import React from 'react'
import {
	Text,
	View,
	Image,
	TextInput,
	Button
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { styles } from './common/styles'
import { userEdit } from '../actions'

class EditProfile extends React.Component {
	static navigationOptions = ({navigation}) => {
		const { params } = navigation.state
		return {
			headerTitle: "Waveby",
			headerLeft: (
				<Button
					onPress={() => params.cancel()}
					title="Cancel"
					color="blue"
				/>
			),
			headerRight: (
				<Button
					onPress={() => params.done()}
					title="Done"
					color="blue"
				/>
		)}
	}

	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			email: props.user.email,
			name: props.user.name,
			displayName: props.user.displayName
		}
		this.cancel = this.cancel.bind(this)
		this.onChangeProfilePhoto = this.onChangeProfilePhoto.bind(this)
		this.onDonePress = this.onDonePress.bind(this)
		this.props.navigation.setParams({done: this.onDonePress})
		this.props.navigation.setParams({cancel: this.cancel})
	}

	cancel = () => {
		console.log("Cancel")
	}

	onChangeProfilePhoto = () => {
		console.log("Changing profile photo")
	}

	onDonePress = () => {
		console.log("On done press")
		this.props.userEdit(this.state)
	}

	render() {
		// const { name, email, displayName } = this.props
		// const displayNameValue = displayName ? displayName : "Display Name"
		const name = this.state.name
		const displayNameValue = this.displayName ? this.displayName : "Display Name"
		const email = this.state.email
		return (
			<View
				style={styles.editProfilePhotoContainer}
			>
				<Text>Edit Profile</Text>
				<Image
					source={require('../../assets/4296950-avatar-business-face-people-icon-people-icon-png-512_512.png')}
					style={styles.editProfileIcon}
				/>
				<Button
					style={styles.editProfilePhoto}
					onPress={() => this.onChangeProfilePhoto()}
					title="Change Profile Photo"
				/>
				<View style={styles.editProfileNameContainer}>
					<View style={{...styles.editProfileNameLabel, ...styles.editProfileLabel}}>
						<Text>Name</Text>
					</View>
					<TextInput
						style={styles.editProfileNameInput}
						onChangeText={(name) => this.setState({name})}
						placeholder={name}
					/>
				</View>
				<View style={styles.editProfileNameContainer}>
					<View style={{...styles.editProfileNameLabel, ...styles.editProfileLabel}}>
						<Text>Display Name</Text>
					</View>
					<TextInput
						style={styles.editProfileNameInput}
						onChangeText={(displayName) => this.setState({displayName})}
						placeholder={displayNameValue}
					/>
				</View>
				<View style={styles.editProfileNameContainer}>
					<View style={{...styles.editProfileNameLabel, ...styles.editProfileLabel}}>
						<FAwesomeIcon
							name="envelope-o"
							color="rgb(89, 102, 139)"
							style={styles.editProfileNameLabelEmailIcon}
							size={15}
						/>
						<Text>Email</Text>
					</View>
					<TextInput
						style={styles.editProfileNameInput}
						onChangeText={(email) => this.setState({email})}
						placeholder={email}
					/>
				</View>
			</View>

		)
	}
}

const mapStateToProps = (state) => {
	const {user} = state.authentication
	return {user}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userEdit: (user) => dispatch(userEdit(user))
	}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditProfile))