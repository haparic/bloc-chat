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
    
              <div className="messagePlane">
                {showMessages ? (<MessageList firebase={firebase} currentRoom={this.state.currentRoom.key} user={this.state.user} />) : (null) }
              </div>
            </main>
          </div>
        );
      }
    }
    
    export default App;
    
/*
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeRoom: '',
        currentUser: null,
      };
  
      this.setActiveRoom = this.setActiveRoom.bind(this);
      this.setUser = this.setUser.bind(this);
    }
  
    setActiveRoom(room) {
      this.setState({ activeRoom: room });
    }
  
    setUser(user) {
      this.setState({ currentUser: user});
    }
  
  
    render() {
      return (
        <div className="App">
          <h1 className="App-title">BLOC CHAT</h1>
  
          <aside id="sidebar">
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
            { this.state.activeRoom ?
              (<MessageList firebase={firebase} activeRoom={this.state.activeRoom} currentUser={this.state.currentUser}/>) : (null)
            }
          </aside>
          <h3 className="chatRooms">{this.state.activeRoom.name || "Your Chat Rooms"}</h3>
          <User firebase={firebase} currentUser={this.state.currentUser} setUser={this.setUser}/>
        </div>
      );
    }
  }
  
  export default App;
 
  

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    activeRoom: "",
    username: null
    };
    this.activeRoom = this.activeRoom.bind(this);
    this.activeUser = this.activeUser.bind(this);
  }
  
  activeRoom(room){
    this.setState({activeRoom:room});
  }
  activeUser(user) {
    if (user === null ) {
      return this.setState({ user: "Guest"})
    } else return this.setState({user: user.displayName})
  }

  render() {
    return (
      <div className="App">
          <div className="sidebar">
          <RoomList activeRoom={this.state.activeRoom} firebase={firebase} setActiveRoom={(name)=>this.activeRoom(name)}/>
          </div>
          <div>
            <User username=
            {this.state.username} firebase={firebase} activeUser={(user)=>this.username(user)}/>
          </div>
            <main>
              <MessageList activeRoom={this.state.activeRoom} firebase={firebase}/>
            </main>
      </div> 
    );
  } 
} 

export default App
*/
