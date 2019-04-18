import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      content: "",
      sentAt: "",
      roomId: "",
      };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }

  createMessage(e, user) {
    e.preventDefault();

    this.messagesRef.push({
      user: this.props.user,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.currentRoom.key,
    });
    this.setState({content: ""});
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }


  render() {

    const currentRoom = this.props.currentRoom;
    const messageList = this.state.messages



    .filter(message => message.roomId === currentRoom)
    .map(message => {
      return <div key={message.key}>{message.user + ":" + message.content + " Sent At:" + message.sentAt}</div>
    })


    return (
      <div className='Messages'>
        <div>
          <p>Messages</p>
        {messageList}</div>
        <form className="newMessages" >
          <input type='text' value={this.state.content} onChange={(e) => this.handleChange(e)} />
          <input type='submit' onClick={(e) => this.createMessage(e)} />
        </form>
      </div>

    );
  }

}

export default MessageList;