import React from 'react';

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import './styles/Login.css'

import LoginForm from './LoginForm'

class Login extends React.Component {
    render() {
        return (
            <Box
                className="login-container"
            >
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="login-grid-container"
                >
                    <Grid
                        item
                    >
                        <h1 id="header-title">waveby</h1>
                        <h6 id="header-slogan">lets make friends</h6>
                    </Grid>
                    <Grid item>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Login