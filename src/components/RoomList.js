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

  selectRoom(key) {
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
                <div key={room.key} onClick={(e)=> this.selectRoom(room, e)}> {room.name}</div>
              )
            })}
          </ul>
        </div>

        <form className='roomInput'>
          <input type='text' value={this.state.roomName} onChange={(e) => this.handleChange(e)} />
          <input type= 'submit' onClick= {(e) => this.createRoom(e)} />
        </form>

      </section>
    );
  }
}

export default RoomList;


/*

import React, { Component } from 'react';

class RoomList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.createNewRoom = this.createNewRoom.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(this.roomsRef);
      }

      componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({rooms: this.state.rooms.concat( room )})
        }); 
      }
      createNewRoom(e) {
          e.preventDefault();
        this.roomsRef.push({ name: this.state.name });
        this.setState({ name: "" });
      }
      handleChange(e) {
        this.setState({ name: e.target.value });
      }
      activeRoom(e,name) {
          console.log('activeRoom')
          this.props.setActiveRoom(name);
      }
      
    
      

render() {
    const newRoomForm = (
        <form onSubmit={this.createNewRoom}>
        <input type="text" value={this.state.name} placeholder="Enter new chat name" onChange={this.handleChange} />
        <input type="submit" value="Create" />
      </form>
    );

    return(
        <section className='roomChange'>
        <div className='roomListDiv'>
            <h2>Room List</h2>
            <ul className='roomList'>
                {this.state.rooms.map( (room) =>
                    <li className="roomNames" key={room.key}
                    onClick={(e) => this.activeRoom(e,room.key)}>{room.name} 
                    </li>
                )}
            </ul>
            <div>{newRoomForm}</div>
        </div>
        </section>
    
    )}
}

export default RoomList */