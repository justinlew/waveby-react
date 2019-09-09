import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Login.css'
import { signUp } from '../actions'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
	render() {
        return (
            <Box
                mt={10}
                pt={5}
                pb={5}
                className="login-container"
            >
                <Grid
                    container
                    spacing={5}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                    >
                        <h1>waveby</h1>
                        <h6>lets make friends</h6>
                    </Grid>
                    <Grid item>
                        <SignUpForm/>
                    </Grid>
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