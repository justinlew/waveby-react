import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Login.css'
import { signUp } from '../actions'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
	constructor(props) {
		super(props)
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
                    <SignUpForm/>
                </Grid>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => {
    return {
        signUp: userInfo => dispatch(signUp(userInfo)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)