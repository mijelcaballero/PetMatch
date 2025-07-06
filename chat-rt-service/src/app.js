const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redisAdapter = require('socket.io-redis');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"]
  }
});

if (process.env.REDIS_URL) {
  io.adapter(redisAdapter({ url: process.env.REDIS_URL }));
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', ({ room }) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('message', ({ room, message, sender }) => {
    const payload = { sender, message, timestamp: new Date() };
    io.to(room).emit('message', payload);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'chat-rt-service' });
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
  console.log(`chat-rt-service listening on port ${PORT}`);
});
