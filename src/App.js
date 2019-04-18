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
    constructor(props){
      super(props)
    
      this.state = {
        currentRoom: '',
        user: null
      };
    }
    
    setCurrentRoom(room ) {
      this.setState({currentRoom: room})
    }
    
    setUser(user){
      if (user === null ) {
        return this.setState({ user: "Guest"})
      } else return this.setState({user: user.displayName})
    }
    
      render() {
    
        const showMessages = this.state.currentRoom;
    
        return (
          <div className='App'>
            <header>
              <h1>Chat:  {this.state.currentRoom.name}</h1>
              <h3>
                <User firebase = {firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
              </h3>
            </header>
    
            <aside className='sidebar'>
              <RoomList firebase={firebase} currentRoom={this.setCurrentRoom.bind(this)}/>
            </aside>
    
            <main>
    
              <div className="message">
                {showMessages ? (<MessageList firebase={firebase} currentRoom={this.state.currentRoom.key} user={this.state.user} />) : (null) }
              </div>
            </main>
          </div>
        );
      }
    }
    
    export default App;
