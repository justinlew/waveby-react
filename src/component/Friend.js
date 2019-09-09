import React from 'react'
import avatar1 from './public/person-girl-flat.png'
import './styles/Friend.css'
import { FaUserPlus } from 'react-icons/fa'

export default class Friend extends React.Component {
    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.conversation)
        }
    }

    onIconClick = () => {
        this.props.onIconClick(this.props)
    }

    renderAvatar() {
        if (!this.props.avatar) {
            return avatar1
        } else {
            return `data:image/jpg;base64,${this.props.avatar}`
        }
    }

    render() {
        return (
            <div className="container py-3 friend-list-container" onClick={this.onClick}>
                <div className="row">
                    <div className="col friend-name-container">
                        <img className="friend-icon mr-3" src={this.renderAvatar()} alt="avatar"/>
                        <span className="align-right white">{this.props.name}</span>
                    </div>
                    {this.props.status === "requested" && !this.props.isSourceUser ? (
                    <div className="col text-right">
                        <button className="btn" onClick={this.onIconClick}>
                            <FaUserPlus />
                        </button>
                    </div>) : undefined}
                    {this.props.status === "requested" && this.props.isSourceUser ? (
                        <button className="btn btn-sm btn-outline-secondary mr-2">
                            Pending
                        </button>
                    ) : undefined}
                </div>
            </div>
        )
    }
}