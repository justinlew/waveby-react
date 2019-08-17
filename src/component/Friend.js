import React from 'react'
import avatar1 from './public/person-girl-flat.png'
import './styles/Friend.css'

export default class Friend extends React.Component {
    onClick = () => {
        this.props.onClick(this.props.conversation)
    }

    render() {
        console.log("Friend props: ", this.props)
        return (
            <div className="container py-3 friend-list-container" onClick={this.onClick}>
                <div className="row">
                    <div className="col float-left friend-name-container">
                        <img className="friend-icon mr-5" src={avatar1} alt="avatar"/> 
                        <span className="align-middle white">{this.props.name}</span>
                    </div>
                </div>
            </div>
        )
    }
}