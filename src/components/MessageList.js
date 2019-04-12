import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            messages: [],
            addMessage: "",
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
        };
        this.messagesRef = this.props.firebase.database().ref('Messages');
        this.newMessage = this.newMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({messages: this.state.messages.concat( message )})
        }); 
    }
    newMessage(e) {
        e.preventDefault();
        this.messagesRef.push({ addMessage: this.state.addMessage });
        this.setState({ addMessage: "" });
        this.setState({roomID: '== this.props.activeRoom'}) //want to make it equal to the active room
        this.setState({username:'this.props.username'})
    }
    handleChange(e) {
        this.setState({ addMessage: e.target.value });
    }
    render() { //addMessage is the only showing up instead of content, roomID, sentAt, and Username
        const messageForm = (
            <form onSubmit={this.newMessage}>
            <input type="text" value={this.state.messages.addMessage} placeholder="Chat with the us" onChange={this.handleChange} />
            <input type="submit" value="submit" />
            </form>
        )
      return (
        <div className="MessageListDiv">
        <h2>Messages</h2>
          <ul className='MessageList'>
                {this.state.messages.map( (message) => (message.roomID == this.props.activeRoom) ? 
                    (<li className="messageName" key={message.key}>{message.content} - {message.username} - {message.sentAt}</li>) : ''
                )}
            </ul>
            <div>{messageForm}</div>
        </div>
      );
    }
  }
  
  export default MessageList;