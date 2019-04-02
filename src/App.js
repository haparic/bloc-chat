import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        
            <main>
              <RoomList firebase={firebase}/>
            </main>
        
        
      </div>
    );
  }
}

export default App;
