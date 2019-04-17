import React, { Component } from 'react';


class User extends Component {
  constructor(props){
  super(props);

    this.signIn.bind(this);
    this.signOut.bind(this);

    }


  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      console.log(this.props.user);
    });
  }

  signOut(){
    this.props.firebase.auth().signOut().then((result) => {
      console.log("sign out successful");
      this.props.setUser(null);
    });
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    })
  }

  render () {
    return (

      <section>
        <div id="user-name">{this.props.user}</div>

        {this.props.user === 'Guest' ?
            <button id="sign-in" onClick={() => this.signIn()}>Log In</button>
          :
            <button id="sign-out" onClick={() => this.signOut()}>Log Out</button>
          }
          {console.log(this.props.user)}
      </section>

    );
  }

}

export default User