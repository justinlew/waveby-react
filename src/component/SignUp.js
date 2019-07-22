import React, { Component } from 'react';
// import { View, TextInput, Text, TouchableOpacity, ImageBackground, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import './styles/Login.css'
// import { styles } from './common/styles';
import { signUp } from '../actions'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { width, maxWidth } from '@material-ui/system'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: ""
		}
		this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
	}

	onSignUpSubmit() {
		// this.props.signUp(this.state);
		console.log("Submitting")
	}

	render() {
        return (
            <Box
                mt={10}
                pt={5}
                pb={5}
                className="grey-container"
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <h1>Waveby</h1>
                    <SignUpForm onSubmit={this.onLoginSubmit}/>
                </Grid>
            </Box>
        );
    }

	// render() {
	// 	return (
	// 		<ImageBackground
    //             style = {styles.imageBackgroundContainer}
    //             source = {require('../../assets/NightCityView.jpg')}
    //             blurRadius = {10}
    //         >
	// 			<View style={styles.container}>
	// 				<View style={styles.loginContainer}>
	// 					<Text
	// 						style={styles.loginTitle}
	// 					>
	// 						Waveby
	// 					</Text>
	// 					<TextInput
	// 						style={styles.textInputContainer}
	// 						placeholder="Name"
	// 						onChangeText={(name) => this.setState({name})}
	// 					/>
	// 					<TextInput
	// 						style={styles.textInputContainer}
	// 						placeholder="Email"
	// 						onChangeText={(email) => this.setState({email})}
	// 					/>
	// 					<TextInput
	// 						style={styles.textInputContainer}
	// 						placeholder="Password"
	// 						onChangeText={(password) => this.setState({password})}
	// 						secureTextEntry
	// 					/>
	// 					<TextInput
	// 						style={styles.textInputContainer}
	// 						placeholder="Confirm password"
	// 						onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
	// 						secureTextEntry
	// 					/>
	// 					<TouchableOpacity
	// 						style={styles.loginButton}
	// 						title="Sign Up"
	// 						accessibilityLabel="Click here to sign up a new account with us"
	// 						onPress={this.onSignUpSubmit}
	// 					>
	// 						<Text>
	// 							Sign up
	// 						</Text>
	// 					</TouchableOpacity>
	// 				</View>
	// 				<View style = {{...styles.noAccountContainer, ...styles.loginContainer, ...styles.rowContainer}}>
    //                     <Text>
    //                         Have an account already?
    //                     </Text>
    //                     <Button
    //                         onPress={() => this.props.navigation.navigate('Login')}
    //                         title="Login"
    //                     />
    //                 </View>
	// 			</View>
	// 		</ImageBackground>
	// 	);
	// }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => {
    return {
        signUp: userInfo => dispatch(signUp(userInfo)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)