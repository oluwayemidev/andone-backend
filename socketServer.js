// socketServer.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', ({ userId }) => {
    socket.join(userId);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.receiver).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.set('socketio', io);

module.exports = { io, server };
