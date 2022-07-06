const sessionUsername = "User0"

createNewMessage("usuario 1", "Mensagem de teste", "today at 22:59")
createNewMessage("User0", "Mensagem de teste", "today at 22:59")

let chatbox = document.getElementById("chatbox")
chatbox.addEventListener("keypress", (Event) => {
  const keyName = Event.key
  console.log(keyName)
  if (keyName == "Enter") {
    let now = new Date()
    createNewMessage(
      sessionUsername,
      chatbox.value,
      String(now.getHours()) + ":" + String(now.getMinutes())
    )
    chatbox.value = ""
  }
})

function createNewMessage(username, content, date) {
  const container = document.getElementById("messages-container")
  console.log(container)

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
