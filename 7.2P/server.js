const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3007;

app.use(express.static('public'));

let poll = {
  ready: 0,
  needHelp: 0,
  confused: 0
};

let messages = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('pollUpdate', poll);
  socket.emit('messageList', messages);

  socket.on('vote', (choice) => {
    if (poll[choice] !== undefined) {
      poll[choice] += 1;
      io.emit('pollUpdate', poll);
    }
  });

  socket.on('sendMessage', (text) => {
    const cleanText = String(text).trim();

    if (cleanText.length > 0) {
      const message = {
        text: cleanText,
        time: new Date().toLocaleTimeString()
      };

      messages.unshift(message);
      messages = messages.slice(0, 5);
      io.emit('messageList', messages);
    }
  });

  socket.on('resetPoll', () => {
    poll = {
      ready: 0,
      needHelp: 0,
      confused: 0
    };

    io.emit('pollUpdate', poll);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
