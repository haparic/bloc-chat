import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user);
        });
      }
      
      signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
          console.log(result);
      });
      }
      
      signOut() {
        this.props.firebase.auth().signOut();
      }
    

render () {
  return(
   <div className="sign in button">
    <button className="sign in" onClick= {this.signIn}>Log In</button>
    <button className="sign out" onClick= {this.signOut}>Log out</button> 
      <p>
       Welcome, {this.props.currentUser ? this.props.currentUser.displayName : "Guest"}! 
      </p>
    </div> 
  )
}
}

export default User