import { WebSocketServer } from "ws"
import * as cfg from "./config.js"

const d = 7
const config = new cfg.Config(d)

// set IP address sequentially here, but you can set in arbitrarily (in case some pole broke and need replace very quickly)
let ip_start = 100
config.iterate_stabilizer((i, j) => config.ip_address[i][j] = `192.168.0.${ip_start++}`)
config.print()




const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server",
    content: [ 1, "2" ]
  }));

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);

    switch (packet.type) {
      case "hello from client":
        // ...
        break;
    }
  });
});
