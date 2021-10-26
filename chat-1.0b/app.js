// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello world</h1>');
// // });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

//   io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });

//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
//       });

//   });

// server.listen(1234, () => {
//   console.log('listening on *:1234');
// });



const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});