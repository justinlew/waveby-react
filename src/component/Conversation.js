import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Message from './Message'
import './styles/Conversation.css'
import $ from 'jquery'

class Conversation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMessageReload = this.handleMessageReload.bind(this)
        this.renderMessages = this.renderMessages.bind(this)
        this.handleChatMessage = this.handleChatMessage.bind(this)
    }

    handleMessageReload(messages) {
        this.setState({messages})
    }

    handleChatMessage(message) {
        this.setState(state => {
            const messages = state.messages.concat(message)
            return {
                messages
            }
        })
    }

    renderMessages() {
        const { messages } = this.state
        return messages.map((message) => {
            return (<li>{message}</li>)
        })
    }

    componentDidMount() {
        const development = process.env.NODE_ENV !== 'production'
        const url = development ? "http://localhost:3000" : "https://mighty-waters-11379.herokuapp.com"
        this.socket = io(url, {
            query: {
                token: localStorage.getItem('token'),
                conversation: this.props.match.params.id
            }
        })

        this.socket.on('reload messages', messages => this.handleMessageReload(messages))

        this.socket.on('chat message', message => this.handleChatMessage(message))
    }

    componentDidUpdate(prevProps) {
        $("html").animate({ scrollTop: $(document).height()}, 'slow')
    }

    handleSubmit(event) {
        console.log("Submitting")
        event.preventDefault()
        this.socket.emit('chat message', this.state.message)
        $('.message-input').val('')
    }

    handleChange(event) {
        this.setState({message: event.target.value})
    }

    render() {
        const list = this.state.messages.map((message, index) => {
            if (message.author._id === this.props.user._id) {
                return (<li className="message-list float-right background-blurple my-1" key={index}>
                    <Message {...message}/>
                </li>)
            } else {
                return (<li className="message-list float-left my-1" key={index}>
                    <Message {...message}/>
                </li>)
            }
        })
        return (
            <div>
                <div ref='wrap'>
                    <ul className="pl-0">
                        {list}
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit} >
                    <input className="message-input" type="text" name="message" placeholder="Send a message" onChange={this.handleChange} required/>
                    <button type="submit" className="btn btn-secondary btn-block margin-bottom">Send message</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, isFetchingUser } = state.user
    const { token } = state.authentication
	return { user, token, isFetchingUser }
}

export default connect(mapStateToProps)(Conversation)