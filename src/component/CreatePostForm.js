import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createPost } from '../actions/post'

import TextField from '@material-ui/core/TextField'

class CreatePostForm extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}

	renderInput(formProps) {
        return <textarea
        	className="form-control"
        	onChange={formProps.input.onChange}
        	value={formProps.input.value}
        	label={formProps.label}
        	placeholder="Is there something on your mind?"
        />
    }

    onSubmit(formValues) {
        this.props.createPost(formValues.body)
    }

    render() {
    	return (
    		<div>
    			<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
    				<Field name="body" component={this.renderInput} type="text" label="Post" />
    				<button type="submit" className="btn btn-primary">Submit Post</button>
    			</form>
    		</div>
    	)
    }
}

const mapStateToProps = (state) => ({
});

// const mapDispatchToProps = dispatch => {
//     return {
//         login: credentials => dispatch(login(credentials)) 
//     }
// }

const mapDispatchToProps = dispatch => {
	return {
		createPost: body => dispatch(createPost(body))
	}
}

export default reduxForm({
	form: 'createPost'
})(connect(mapStateToProps, mapDispatchToProps)(CreatePostForm))