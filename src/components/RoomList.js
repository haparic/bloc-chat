import React, { Component } from 'react';

class RoomList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            name: " "
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        console.log(this.roomsRef);
      }

      componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({rooms: this.state.rooms.concat( room )})
        }); 
      }
        /*componentWillUnmount() {
            this.roomsRef.off("child_added", (snapshot) => {
                const room = snapshot.val();
                room.key= snapshot.key;
                this.setState({rooms: this.state.rooms.concat( room ) })
            })
        }*/
      

render() {
    return(
        <div className='roomListDiv'>
            <h2>Room List</h2>
            <ul className='roomList'>
                {this.state.rooms.map( (room) =>
                    <li className="roomNames" key={room.key}>{room.name}</li>
                )}
            </ul>
        </div>
    )}
}

export default RoomList