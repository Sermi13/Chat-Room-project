// const { Socket } = require("dgram")
var sessionUsername = ""
let chatbox = document.getElementById("chatbox")
chatbox.addEventListener("keypress", (Event) => {
  const keyName = Event.key
  if (keyName == "Enter") {
    let now = new Date()
    let msg = {
      usr: sessionUsername,
      type: "msg",
      message: chatbox.value,
      time: now,
    }
    socket.send(JSON.stringify(msg))
    //reset chatbox
    setTimeout(() => {
      chatbox.value = ""
    }, 1)
  }
})

function createNewMessage(username = "anon", content, date) {
  const container = document.getElementById("messages-container")

  let message = document.createElement("div")
  if (username == sessionUsername) {
    message.classList.add("message-user")

    message.innerHTML = `
  <div class="message-box">
    <p class="message-content">
      ${content}
    </p>
    <p class="message-date">${date}</p>`
  } else {
    message.classList.add("message-other")

    message.innerHTML = `
  <div class="message-box">
    <p class="message-owner">${username}</p>
    <p class="message-content">
      ${content}
    </p>
    <p class="message-date">${date}</p>`
  }

  container.appendChild(message)
}

var socket = new WebSocket("ws://localhost:8080")

socket.onopen = () => {
  console.log("connection stabilished")
}

socket.onmessage = async function (event) {
  let msgRaw = await event.data
  msg = JSON.parse(msgRaw)
  console.log(msg)
  if (msg.type == "msg") {
    createNewMessage(msg.usr, msg.message, msg.time)
  } else {
    sessionUsername = String(msg.id)
    console.log(msg.id)
  }
}

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(
      `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
    )
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert("[close] Connection died")
  }
}

socket.onerror = function (error) {
  alert(`[error] ${error.message}`)
}
