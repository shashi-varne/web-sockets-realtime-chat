var socket = io("http://localhost:3000", { transports: ["websocket"] }); //this is the url of the server
const messageForm = document.querySelector("#send-container");
const messageInput = document.querySelector("#message-input");
const messageBox = document.querySelector("#message-container");

const name = prompt("what is your name?");
appendMessage("You joined");
//send new user name to server
socket.emit("new-user", name);

//listen to changes that happen in the server
socket.on("chat-message", (incomingMessageData) => {
  appendMessage(`${incomingMessageData.name}: ${incomingMessageData.message}`);
});

//handle new user joined
socket.on("new-user-joined", (newUserName) => {
  appendMessage(`${newUserName} joined!`);
});

//handle user disonnectd
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); //stop form from submitting
  const message = messageInput.value;

  //to send data from client to server, we use socket.emit()
  socket.emit("send-chat-message", message);
  appendMessage(`You: ${message}`);
  messageInput.value = "";
});

function appendMessage(message) {
  const div = document.createElement("div");
  div.innerText = message;
  messageBox.append(div);
}
