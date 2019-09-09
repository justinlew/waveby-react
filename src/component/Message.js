import React from 'react'
import avatar from './public/avatar.png'

function renderAvatar(picture) {
    if (!picture) {
        return avatar
    } else {
        return `data:image/jpg;base64,${picture}`
    }
}

function Message(props) {
    console.log(props)
    return (
        <div className="card">
            <div className="card-body px-1 py-1">
                <h6 className="card-title mb-0">
                    <img className="iconImageMessage" src={renderAvatar(props.author.avatar)} alt="Avatar icon"/>
                    {props.author.name}
                </h6>
                <p className="card-text">{props.message}</p>
            </div>
        </div>
    )
}

export default Message