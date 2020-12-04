import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class SocketWithId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      roomId: this.props.selectedRoomId,
    };
    this.endpoint = 'http://localhost:3005';
    this.socket = socketIOClient(this.endpoint, {
      query: `roomId=${this.props.selectedRoomId}`,
    });
  }
  componentDidMount() {
    this.onUpdateChatroom();
    this.socket.on('initialList', (data) => this.setState({ messages: data }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedRoomId !== this.props.selectedRoomId) {
      this.socket.disconnect();
      this.socket = socketIOClient(this.endpoint, {
        query: `roomId=${this.props.selectedRoomId}`,
      });
      this.socket.on('getMessages', (data) =>
        this.setState({ messages: data })
      );
      this.setState(
        {
          roomId: this.props.selectedRoomId,
        },
        () => {
          this.onUpdateChatroom();
        }
      );
    }
  }
  onUpdateChatroom = () => {
    //here I just make an api call to get messages the old fashion way   //but you don't NEED this if you want to just use socket-io's  //handler
  };
  render() {
    return <div></div>;//however you want to display your messages
  }
}
export default SocketWithId;
