import React from 'react'

import { connect } from 'react-redux'
import { postUserAvatar } from '../actions'
import { bindActionCreators } from 'redux';

class ChangeAvatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: null,
            imagePreviewUrl: ''
        }
        this.handleImageChange = this.handleImageChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleImageChange(e) {
        e.preventDefault()
        let reader = new FileReader()
        let avatar = e.target.files[0]
        this.setState({
            avatar: e.target.files[0]
        })

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(avatar)
    }

    onSubmit(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', this.state.avatar)
        this.props.postUserAvatar(formData)
    }

    renderLoadingIndicator() {
        return (
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Uploading...</span>
            </div>
        )
    }

    render() {
        let { imagePreviewUrl } = this.state
        let { isUploadingAvatar } = this.props
        console.log(isUploadingAvatar)
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = <img className="iconImage" alt="Profile avatar" src={imagePreviewUrl} />
        }
        return (
            <div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Profile Picture</span>
                        </div>
                        <div className="custom-file">
                            <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={this.handleImageChange} name="avatar" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" required/>
                            <label className="custom-file-label" for="inputGroupFile01">Browse</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">{isUploadingAvatar ? this.renderLoadingIndicator() : "Upload profile picture"}</button>
                </form>
                {imagePreview}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	const { isFetchingUser, isUploadingAvatar, user } = state.user
	return { user, isFetchingUser, isUploadingAvatar }
}
const mapDispatchToProps = dispatch => bindActionCreators({
	postUserAvatar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar)