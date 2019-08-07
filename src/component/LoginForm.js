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
        console.log(formValues)
        this.props.login(formValues)
    }

    renderInput(formProps) {
        return <TextField onChange={formProps.input.onChange} value={formProps.input.value} label={formProps.label} type={formProps.type}/>
    }

    render() {
        return (
            <Paper>
                <Box
                    p={2}
                >
                    <form className="auth-form-container" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
                                Login
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials)) 
    }
}
export default reduxForm({
    form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm))