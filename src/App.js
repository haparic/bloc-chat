import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/Users';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCXOStLJdci2TCZcpRzXoPXC4HKULcJSs",
    authDomain: "bloc-chat-f2e93.firebaseapp.com",
    databaseURL: "https://bloc-chat-f2e93.firebaseio.com",
    projectId: "bloc-chat-f2e93",
    storageBucket: "bloc-chat-f2e93.appspot.com",
    messagingSenderId: "40221233886"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    activeRoom: null,
    username: null
    };
  }
  
  activeRoom(room){
    this.setState({activeRoom:room});
  }
  activeUser(user) {
    this.setState({activeUser: user})
  }

  render() {
    return (
      <div className="App">
          <div className="sidebar">
          <RoomList activeRoom={this.state.activeRoom} firebase={firebase} setActiveRoom={(name)=>this.activeRoom(name)}/>
          </div>
          <div>
            <User username=
            {this.state.activeUser} firebase={firebase} setActiveUser={(user)=>this.activeUser(user)}/>
          </div>
            <main>
              <MessageList activeRoom={this.state.activeRoom} firebase={firebase}/>
            </main>
      </div>
    );
  }
}

export default App;
