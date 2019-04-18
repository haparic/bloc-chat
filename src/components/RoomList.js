import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomName: " ",
      name: " "
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ roomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
    name: this.state.roomName
    });
    this.setState({roomName: " "});
  }

  activeRoom(key) {
    this.props.currentRoom(key);
  }


  render () {
    return (
      <section>

        <div className='roomList'>
          <h2>Rooms:</h2>
          <ul>
            {this.state.rooms.map( ( room ) => {
              return (
                <div key={room.key} onClick={(e)=> this.activeRoom(room, e)}> {room.name}</div>
              )
            })}
          </ul>
        </div>
            <h2>Create New Room</h2>
        <form className='roomInput'>
          <input type='text' value={this.state.roomName} placeholder="Enter New Room" onChange={(e) => this.handleChange(e)} />
          <input type= 'submit' onClick= {(e) => this.createRoom(e)} />
        </form>

      </section>
    );
  }
}

export default RoomList;