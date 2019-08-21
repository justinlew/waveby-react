import React from 'react'
import avatar from './public/avatar.png'

function Message(props) {
    return (
        <div className="card">
            <div className="card-body px-1 py-1">
                <h6 className="card-title mb-0">
                    <img className="iconImageMessage" src={avatar} alt="Avatar icon"/>
                    {props.author.name}
                </h6>
                <p className="card-text">{props.message}</p>
            </div>
        </div>
    )
}

export default Message