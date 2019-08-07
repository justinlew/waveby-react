import React from 'react'
import { connect } from 'react-redux'
import avatar from './public/avatar.png'

class UserList extends React.Component {

    render() {
        const { searchedUsers } = this.props
		const listItems = searchedUsers.slice(0).reverse().map((user) => {
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
                            <div className="col">
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
	return { isSearchingUsers, searchedUsers }
};

export default connect(mapStateToProps)(UserList)