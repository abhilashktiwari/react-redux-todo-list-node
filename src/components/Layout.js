import React from 'react';
import { connect } from 'react-redux';
import {
  loadInitialDataSocket,
  addNewItemSocket,
  markItemCompleteSocket,
  deleteItemSocket,
  AddItem,
  completeItem,
  deleteItem,
} from '../redux/actions/Todo';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { IconButton, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import FilterButton from '../components/FilterButtons';

// import {List as List} from 'immutable';

let robotFontStyle = {
  fontFamily: 'Roboto, sans-serif',
  color: 'rgba(0, 0, 0, 0.870588)',
};
let markCompleteStyle = {
  textDecoration: 'line-through',
};
let socket;

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    const { AddItem, completeItem, loadInitialDataSocket, deleteItem } = this.props;
    this.state = { term: '', alertOpen: false };
    socket = io.connect('http://localhost:3005');
    loadInitialDataSocket(socket);

    socket.on('itemAdded', (res) => {
      console.dir(res);
      AddItem(res);
    });

    socket.on('itemMarked', (res) => {
      console.dir(res);
      completeItem(res);
    });

    socket.on('itemDeleted', (res) => {
      console.dir(res);
      deleteItem(res);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
    alert('Disconnecting Socket as component will unmount');
  }

  render() {
    const { items,
      //loadInitialDataSocket,
      addNewItemSocket,
      markItemCompleteSocket,
      deleteItemSocket,
      //AddItem,
      //completeItem,
      // deleteItem
    } = this.props;
    return (
      <div>
        <h1 style={robotFontStyle}>MERN ToDo</h1>

        <TextField className="addTasksField" label="Add new task" variant="outlined" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })} autoComplete='off' />
        <IconButton id="sendIcon" color="primary" onClick={(e) => {
          e.preventDefault();
          console.log(this.state.term)
          this.state.term === ''
            ? this.setState({ alertOpen: true })
            :
            addNewItemSocket(
              socket,
              items.size,
              this.state.term
            )

          this.setState((state) => {
            const newState = {
              term: '',
              alertOpen: this.state.term !== '' ? false : true
            }
            return newState;
          });
        }}>
          <SendIcon />
        </IconButton>
        { this.state.alertOpen && <Alert severity="error" className="alertBar">Item shouldn't be blank</Alert>}
        <List>
          {items.map((todo, key) => {
            return (
              <ListItem
                key={key}
              >
                <ListItemText primary={todo.item}
                  style={todo.completed ? markCompleteStyle : {}}
                  onClick={(event) => {
                    markItemCompleteSocket(socket, todo.itemId ? todo.itemId : items.size, !todo.completed)
                  }} />

                <IconButton color="secondary" onClick={(event) => {
                  deleteItemSocket(socket, todo.item, todo.itemId ? todo.itemId : items.size)
                }} >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>

      </div >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {

      loadInitialDataSocket,
      addNewItemSocket,
      markItemCompleteSocket,
      deleteItemSocket,
      AddItem,
      completeItem,
      deleteItem,
    },
    dispatch,
  );
};


const mapStateToProps = ({ todo }) => {
  const { items } = todo
  return { items };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
