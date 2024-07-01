const io = require("socket.io")(3000); //start the server on a port number on which you want socket.io to run

const users = {};

io.on("connection", (socket) => {
  //everytime someone loads this webpage, this function will be executed.
  //   socket.emit("chat-message", "Welcome"); //(eventName, event) -> we're sending a message to the client who connects to our server

  //handle incoming data from client
  socket.on("send-chat-message", (message) => {
    //after receiving the incoming data from client, send it to all the other clients.(except the client who sent this message)
    socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
  });

  //handle new-user joining the chatroom
  socket.on("new-user", (name) => {
    users[socket.id] = name; //each client who is part of this session will have a unique id. The current socket.id will be of the client who triggered this event
    socket.broadcast.emit("new-user-joined", name);
  });

  //handle when a user disconnects
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

/*
socket.on() -> listen 
socket.emit() -> send data to server
socket.broadcast.emit() -> publish data to all clients except the client who sent it
 */
