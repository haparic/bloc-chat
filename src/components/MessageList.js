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
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  createMessage(e, user) {
    console.log(this.props.user);
    e.preventDefault();

    this.messagesRef.push({
      user: this.props.user,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.currentRoom,
    });
    this.setState({content: ""});
  }



  render() {

    const currentRoom = this.props.currentRoom;
    const messageList = this.state.messages



    .filter(message => message.roomId === currentRoom)
    .map(message => {
      return <div className='thisMessage' key={message.key}>{message.user + ":" + message.content + " Sent At:" + message.sentAt}</div>
    })


    return (
      <div className='chatMessages'>
        <div>{messageList}</div>
        <ul></ul>
        <form id="newMessage" >
          <input type='text' value={this.state.content} onChange={(e) => this.handleChange(e)} />
          <input type='submit' onClick={(e) => this.createMessage(e)} />
        </form>
      </div>

    );
  }

}

export default MessageList;
/*
import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            messages: [],
            content: ""
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
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
    newMessage(addMessage) {
        addMessage.preventDefault()
        this.messagesRef.push({ 
            username: this.props.username ? this.props.username.displayName : "Guest",
            content: this.state.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.key
        });
        this.setState({ content: "",});
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
        content: e.target.value
        });
  }








    render() { 
        const messageForm = (
            <form onSubmit={this.newMessage}>
            <input type="text" value={this.state.messages.addMessage} placeholder="Chat with us" onChange={this.handleChange} />
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
*/