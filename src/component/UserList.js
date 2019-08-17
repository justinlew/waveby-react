import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from './public/avatar.png'
import { searchUsers } from '../actions'
import { createFriend, fetchFriends } from '../actions/friend'
import { IoIosShareAlt } from 'react-icons/io'
import { FaUserPlus, FaUserFriends } from 'react-icons/fa'

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.onAddFriendButtonPress = this.onAddFriendButtonPress.bind(this)
    }

    AddUserButton(user) {
        return (
            <button className="btn" onClick={() => this.onAddFriendButtonPress(user._id)}>
                <FaUserPlus />
            </button>
        )
    }

    componentDidMount() {
        this.props.searchUsers(this.props.match.params.query)
        this.props.fetchFriends()
    }

    onAddFriendButtonPress(id) {
        console.log("Button press: ", id)
        this.props.createFriend(id)
    }

    render() {
        const { searchedUsers, friends } = this.props
        
		const listItems = searchedUsers.slice(0).reverse().map((user) => {
            const bIsFriend = friends.some((friend) => {
                return friend.user._id === user._id || friend.friend._id === user._id
            })
			return (
                <li className="mb-2">
                    <div className="container-fluid rounded-lg pt-2 pb-1" id="post-container">
                        <div className="row">
                            <div className="col">
                                <div className="d-inline-block">
                                    <div>
                                        <img className="iconImage" src={avatar} alt="The user" />
                                    </div>
                                </div>
                                <div className="d-inline-block">
                                    <b>{user.name}</b>
                                </div>
                                
                            </div>
                            <div className="col"></div>
                            <div className="col">
                                <span className="float-right">
                                    {bIsFriend ? <FaUserFriends /> : this.AddUserButton(user)}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span id="post-body">{this.props.body}</span>
                        </div>
                    </div>
                </li>
			);
		})
        return (
            <ul className="list-group" id="post-list">{listItems}</ul>
        )
    }
}

const mapStateToProps = (state) => {
    const { isSearchingUsers, searchedUsers } = state.user
    const { friends, isFetchingFriends } = state.friend
	return { isSearchingUsers, searchedUsers, friends, isFetchingFriends }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    searchUsers,
    createFriend,
    fetchFriends
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserList)