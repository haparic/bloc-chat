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
      console.log("signed out");
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
        <div className="username">{this.props.user}</div>

        {this.props.user === 'Guest' ?
            <button className="signIn" onClick={() => this.signIn()}>Log In</button>
          :
            <button className="signOut" onClick={() => this.signOut()}>Log Out</button>
          }
      </section>

    );
  }

}

export default User