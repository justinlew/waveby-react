import React from 'react'
import io from 'socket.io-client'

export default class Conversation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000', {
            query: {
                token: localStorage.getItem('token'),
                conversation: this.props.match.params.id
            }
        })

        this.socket.emit('chat message', 'hello room ' + this.props.match.params.id)

        this.socket.on('chat message', function(data) {
            console.log(data)
        })
    }

    handleSubmit(event) {
        console.log("Submitting")
        event.preventDefault()
        this.socket.emit('chat message', this.state.message)
    }

    handleChange(event) {
        this.setState({message: event.target.value})
    }

    render() {
        return (
            <div>
                {this.props.match.params.id}
                <form onSubmit={this.handleSubmit} >
                    <input type="text" name="message" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}