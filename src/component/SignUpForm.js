import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../actions'
import _ from 'lodash'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const required = value => value ? undefined : 'Required'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(formValues) {
        this.props.signUp(formValues)
    }

    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        return (
            <div>
                <label for={label}>{label}</label>
                <input
                    className="form-control"
                    type={type}
                    placeholder={label}
                    value={input.value}
                    onChange={input.onChange}
                />
                <div className="invalid-feedback">
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        )
    }

    renderLoadingIndicator() {
        return (
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    renderSignUpErrors(signUpErrors) {
        if (_.isEmpty(signUpErrors)) {
            return
        }
        let errors = []
        for (let error in signUpErrors) {
            errors.push(
                <li key={error}>{signUpErrors[error].message}</li>
            )
        }
        return (
            <div className="alert alert-danger" role="alert">
                <ul className="mb-0">{errors}</ul>
            </div>
        )
    }

    render() {
        const { isFetching, userCreateError } = this.props
        return (
            <Paper>
                <Box
                    p={2}
                >
                    <form className="needs-validation" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        {this.renderSignUpErrors(userCreateError)}
                        <Box
                            mb={2}
                        >
                            <Field name="name" component={this.renderInput} type="text" label="Name" validate={[required]}/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="displayName" component={this.renderInput} type="text" label="Display Name" validate={[required]}/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="email" component={this.renderInput} type="text" label="Email" validate={[required]}/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="password" component={this.renderInput} type="password" label="Password" validate={[required]}/>
                        </Box>
                        <Box
                            mb={2}
                        >
                            <Field name="passwordConfirmation" component={this.renderInput} type="password" label="Confirm password" validate={[required]}/>
                        </Box>
                        <Box
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth={true}
                            >
                                { isFetching ? this.renderLoadingIndicator() : "Sign Up"}
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

const mapStateToProps = (state) => {
    const { isFetching, userCreateError } = state.user
    return { isFetching, userCreateError }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: userInfo => dispatch(signUp(userInfo)) 
    }
}

export default reduxForm({
    form: 'signup'
})(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))