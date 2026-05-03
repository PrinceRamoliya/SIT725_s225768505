const socket = io();

const ready = document.getElementById('ready');
const needHelp = document.getElementById('needHelp');
const confused = document.getElementById('confused');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

document.querySelectorAll('[data-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    socket.emit('vote', button.dataset.choice);
  });
});

document.getElementById('resetPoll').addEventListener('click', () => {
  socket.emit('resetPoll');
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('sendMessage', messageInput.value);
  messageInput.value = '';
});

socket.on('pollUpdate', (poll) => {
  ready.innerText = poll.ready;
  needHelp.innerText = poll.needHelp;
  confused.innerText = poll.confused;
});

socket.on('messageList', (messageList) => {
  messages.innerHTML = '';

  messageList.forEach((message) => {
    const item = document.createElement('li');
    item.innerText = `${message.time} - ${message.text}`;
    messages.appendChild(item);
  });
});
