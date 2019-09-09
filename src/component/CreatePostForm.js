import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import './styles/Post.css'

import { createPost } from '../actions/post'

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
			id="new-post"
			required
        />
    }

    onSubmit(formValues) {
		const {createPost, reset} = this.props
        createPost(formValues.body).then(() => reset())
	}

	renderLoadingIndicator() {
        return (
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Uploading...</span>
            </div>
        )
    }

    render() {
		console.log("Isposting", this.props.isPosting)
    	return (
    		<div>
    			<form name="create-post-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
    				<Field name="body" component={this.renderInput} type="text" label="Post" />
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-primary m-2 postSubmitButton">{this.props.isPosting ? this.renderLoadingIndicator() : "Submit Post"}</button>
					</div>
    				
    			</form>
    		</div>
    	)
    }
}

const mapStateToProps = (state) => {
	const { isPosting } = state.post
	return { isPosting }
};

const mapDispatchToProps = dispatch => {
	return {
		createPost: body => dispatch(createPost(body))
	}
}

export default reduxForm({
	form: 'createPost'
})(connect(mapStateToProps, mapDispatchToProps)(CreatePostForm))