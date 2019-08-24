import React from 'react';

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import './styles/Login.css'

import LoginForm from './LoginForm'

class Login extends React.Component {
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
                    <LoginForm/>
                </Grid>
            </Box>
        );
    }
}

export default Login