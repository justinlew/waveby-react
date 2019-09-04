import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles/LoginForm.css'
import { login } from '../actions';

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(formValues) {
        this.props.login(formValues)
    }

    renderInput(formProps) {
        return <TextField className="auth-input-container" onChange={formProps.input.onChange} value={formProps.input.value} label={formProps.label} type={formProps.type}/>
    }

    renderLoadingIndicator() {
        return (
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    renderLoginError(loginError) {
        if (loginError && loginError.name === "Error" && loginError.message) {
            return (
                <div className="alert alert-danger" role="alert">
                    {loginError.message}
                </div>
            )
        }
    }

    render() {
        const { isFetching, loginError } = this.props
        return (
            <Paper>
                <Box
                    p={2}
                >
                    <form className="auth-form-container" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        {this.renderLoginError(loginError)}
                        <Box
                            mb={2}
                        >
                            <Field name="email" component={this.renderInput} type="text" label="Email"/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="password" component={this.renderInput} type="password" label="Password"/>
                        </Box>
                        <Box
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth={true}
                            >
                                { isFetching ? this.renderLoadingIndicator() : "Login"}
                            </Button>
                        </Box>
                        <Box>
                            <p>Need an account? <Link to="/signup">Sign up.</Link></p>
                        </Box>
                    </form>
                </Box>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    const { isFetching, loginError } = state.authentication
    return { isFetching, loginError }
}

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials)) 
    }
}
export default reduxForm({
    form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm))