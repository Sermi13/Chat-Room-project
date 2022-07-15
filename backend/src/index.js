const WebSocket = require("ws")
const server = new WebSocket.Server({
  port: 8080,
})

let sockets = []
let lastId = 0
server.on("connection", function (socket) {
  sockets.push(socket)
  lastId += 1
  socket.id = "User" + lastId
  socket.send(JSON.stringify({ type: "auth", id: socket.id }))
  socket.on("message", function (msg) {
    sockets.forEach((s) => s.send(String(msg)))
    console.log("message: " + msg)
  }),
    socket.on("close", function () {
      sockets = sockets.filter((s) => s !== socket)
      console.log(`Conncetion ended: ${socket}`)
    })
})
