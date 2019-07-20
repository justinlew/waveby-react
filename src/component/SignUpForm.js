import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../actions'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'



class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(formValues) {
        console.log(formValues)
        this.props.signUp(formValues)
    }

    renderInput(formProps) {
        return <TextField onChange={formProps.input.onChange} value={formProps.input.value} label={formProps.label}/>
    }
    
    render() {
        return (
            <Paper>
                <Box
                    p={2}
                >
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Box
                            mb={2}
                        >
                            <Field name="name" component={this.renderInput} type="text" label="Name"/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="email" component={this.renderInput} type="text" label="Email"/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="password" component={this.renderInput} type="text" label="Password"/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="passwordConfirmation" component={this.renderInput} type="text" label="Confirm password"/>
                        </Box>
                        <Box
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth={true}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        <Box>
                            <p>Have an account? <Link to='/login'>Login.</Link></p>
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
        signUp: userInfo => dispatch(signUp(userInfo)) 
    }
}

export default reduxForm({
    form: 'signup'
})(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))