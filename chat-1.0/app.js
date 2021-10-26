const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;



app.get('/tester/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message2', msg);
  });
});

server.listen(port, () => {
  console.log(`ctrl+click/click http://localhost:${port}/`);
});
