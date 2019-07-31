import React from 'react'
import avatar1 from './public/person-girl-flat.png'
import './styles/Friend.css'

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container py-3 friend-list-container">
                <div className="row">
                    <div className="col float-left friend-name-container">
                        <img className="friend-icon mr-5" src={avatar1} /> 
                        <span className="align-middle white">Justin Lew</span>
                    </div>
                </div>
                

            </div>
        )
    }
}