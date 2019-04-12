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
          //this.setState({ room: name });
          this.props.setActiveRoom(name);
      }
      
    
        /*componentWillUnmount() {
            this.roomsRef.off("child_added", (snapshot) => {
                const room = snapshot.val();
                room.key= snapshot.key;
                this.setState({rooms: this.state.rooms.concat( room ) })
            })
        }*/
      

render() {
    const newRoomForm = (
        <form onSubmit={this.createNewRoom}>
        <input type="text" value={this.state.name} placeholder="Enter new chat name" onChange={this.handleChange} />
        <input type="submit" value="Create" />
      </form>
    );
    /*
        I want to be able to click on an active room and have the message list from that room show up
        I have created the active room function and added a portion that says on click
        I believe I need to add an on change part to it but I am not sure where to
    */
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

export default RoomList