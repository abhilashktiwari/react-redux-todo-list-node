const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketServer = require('socket.io');
const MONGO_URI =
  'mongodb://abhilash:Gaytri1812@cluster0-shard-00-00-usggn.mongodb.net:27017,cluster0-shard-00-01-usggn.mongodb.net:27017,cluster0-shard-00-02-usggn.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const app = express();

const todoModel = require('./models/todoModel'); //todo model

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGOOSE CONNECT===========================================================================
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('+++ Abhilash connected to mongoose!'))
  .catch((err) => {
    console.log(`--- Abhilash FAILED to connect to mongoose: ${err.message}`);
  });

var serve = http.createServer(app);
var io = socketServer(serve);
serve.listen(3005, () => {
  console.log('+++ Abhilash Express Server with Socket Running!!!');
});

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connection', function (socket) {
  console.log('Connected to Socket!!' + socket.id);
  connections.push(socket);
  socket.on('disconnect', function () {
    console.log('Disconnected - ' + socket.id);
  });

  var cursor = todoModel.find(
    {},
    '-_id itemId item completed',
    (err, result) => {
      if (err) {
        console.log('--- Abhilash GET failed!!');
      } else {
        socket.emit('initialList', result);
        console.log('+++ Abhilash GET worked!!');
      }
    }
  );
  // 		.cursor()
  // cursor.on('data',(res)=> {socket.emit('initialList',res)})

  socket.on('addItem', (addData) => {
    var todoItem = new todoModel({
      itemId: addData.id,
      item: addData.item,
      completed: addData.completed,
    });
    todoItem.save((err, result) => {
      if (err) {
        console.log('ADD NEW ITEM failed!! ' + err);
      } else {
        io.emit('itemAdded', addData);
        console.log({ message: 'ADD NEW ITEM worked!!' });
      }
    });
  });

  socket.on('markItem', (markedItem) => {
    var condition = { itemId: markedItem.id },
      updateValue = { completed: markedItem.completed };

    todoModel.update(condition, updateValue, (err, result) => {
      if (err) {
        console.log('MARK COMPLETE failed!! ' + err);
      } else {
        // connections.forEach((currentConnection)=>{
        // 	currentConnection.emit('itemMarked',markedItem)
        // })
        io.emit('itemMarked', markedItem);

        console.log({ message: 'MARK COMPLETE worked!!' });
      }
    });
  });

  socket.on('deletedItem', (deletedItem) => {
    console.log(deletedItem)
    var condition = { itemId: deletedItem.id, item: deletedItem.item };
    todoModel.deleteOne(condition, (err, result) => {
      if (err) {
        console.log('Delete failed!! ' + err);
      } else {
        io.emit('itemDeleted', deletedItem);
        console.log({ message: 'Delete worked!!' });
      }
    });
  });


});
