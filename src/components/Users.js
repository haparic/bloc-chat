import React, { Component } from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: []
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
       /* this.usersRef = this.props.firebase.database().ref('users');
        this.createNewUser = this.createNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this); */
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.setUser(user);
        });
      }
      
      signIn() {
        this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );
      }
      
      signOut() {
        this.props.firebase.auth().signOut();
      }
    /*componentDidMount() {
        this.usersRef.on('child_added', snapshot => {
          const user = snapshot.val();
          user.key = snapshot.key;
          this.setState({username: this.state.username.concat( user )})
        }); 
    }
    createNewUser(e) {
    e.preventDefault();
      this.usersRef.push({ user: this.state.user });
      this.setState({ user: "" });
    }
    handleChange(e) {
      this.setState({ user: e.target.value });
    }
    activeUser(e,user) {
        console.log('activeUser')
        this.props.setActiveUser(user);
    }
} */ 

render () {
  return(
    <div className="sign in button">
    <button className="sign in" onClick= {this.signIn}>Log In</button>
    <button className="sign out" onClick= {this.signOut}>Log out</button>
      if (signIn == True) {
      <h1>Welcome Back {this.props.user.displayName}</h1>
      }
      else {
        <h1>Guest</h1>
      }
    </div>
  )
}
}

export default Users