import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { logout, searchUsers, getCurrentUser, fetchUserAvatar } from '../actions'
import avatar from './public/avatar.png'
import history from '../history'

class HomeNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {search: ''}
        this.logout = this.logout.bind(this)
        this.searchingUsers = this.searchingUsers.bind(this)
        this.editProfile = this.editProfile.bind(this)
        this.renderAvatar = this.renderAvatar.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentUser()
    }

    logout = () => {
		this.props.logout()
    }
    
    searchingUsers = (event) => {
        if (!event.target.value) {
            history.push('/home')
        } else {
            history.push(`/home/searchUsers/${event.target.value}`)
        } 
    }

    editProfile = (event) => {
        history.push('/home/editProfile')
    }

    renderAvatar() {
        if (!this.props.user.avatar) {
            return avatar
        } else {
            return `data:image/jpg;base64,${this.props.user.avatar}`
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-between" id="navbar-gradient">
                    <div className="navbar-brand"><b><Link to="/home" id="waveby-title">waveby</Link></b></div>
                        <form className="form-inline">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="addon-wrapping"><FaSearch /></span>
                                </div>
                                <input type="text" onChange={this.searchingUsers} className="form-control" aria-label="Search users" placeholder="Search users"/>
                            </div>
                        </form>
                    <div className="my-2 my-lg-0" id="navbarSupportedContent">
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="iconImage" alt="Profile" src={this.renderAvatar()}/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" onClick={this.editProfile}>Edit Profile</a>
                                <a className="dropdown-item" onClick={this.logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
	const { isFetchingUser, user, avatar, isSearchingUsers } = state.user
	return {
		user, isFetchingUser, avatar, isSearchingUsers
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    searchUsers,
    getCurrentUser,
    fetchUserAvatar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar)