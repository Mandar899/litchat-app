const chatForm = document.getElementById('chat-form');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//* Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);
});

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //! Getting message from client
  const msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  //! Emit message from client side to Server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//* Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = ` <div class="bg-blue-100 opacity-80 p-2.5 mb-3.5 rounded-md break-words">
        <p class="text-sm font-semibold font-inter opacity-70 mb-2 text-gray-800">
          ${message.username} <span class="font-inter text-xs font-semibold text-gray-800">${message.time}</span>
        </p>
        <p class="font-inter font-bold ">${message.text}</p>
      </div>`;
  document.querySelector('#chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerHTML = `<p><span>${room}</span></p>`;
}

//Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
  ${users
    .map(
      (
        user
      ) => `<li class="flex justify-left items-center space-x-1 py-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
</svg><span>${user.username}</span></li><hr />`
    )
    .join('')}`;
}

// Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
