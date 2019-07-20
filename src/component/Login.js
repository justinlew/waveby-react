import React from 'react';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'


import './styles/Login.css'

import { login } from '../actions';
import LoginForm from './LoginForm'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    

    // onLoginSubmit(value) {
    //     console.log(value)
    //     // this.props.login(this.state);
    // }

    onLoginSubmit = (credentials) => {
        console.log(JSON.stringify(credentials))
        // this.props.login(credentials)
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
                    <LoginForm onSubmit={this.onLoginSubmit}/>
                </Grid>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)