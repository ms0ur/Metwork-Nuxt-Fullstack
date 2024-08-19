// server/middleware/socket.ts
import { Server } from "socket.io";
import { eventHandler } from "h3";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

interface authentificated_client {
  id: string;
  token: string;
  userID: string;
  username: string;
}

const authentificated_clients: authentificated_client[] = [];

io.on("connection", (socket) => {
  console.log("Connection", socket.id);
});

io.on("connect", (socket) => {
  socket.emit("message", `welcome ${socket.id}`);
  socket.broadcast.emit("message", `${socket.id} joined`);

  socket.on("auth", async function auth(data: any) {
    const data1 = JSON.parse(data);
    if (data1 && data1.token && data1.userID && data1.username) {
      if (await checkTokenValid(data1.token, data1.userID)) {
        authentificated_clients.push({
          id: socket.id,
          token: data1.token,
          userID: data1.userID,
          username: data1.username,
        });
        socket.emit("auth", true);
      } else {
        socket.emit("auth", false);
        io.close();
      }
    } else {
      socket.emit("auth", false);
      io.close();
    }
  });

  socket.on("message", function message(data: any) {
    console.log("message received: %s", data);
    if (data == "ping") {
      socket.emit("message", "pong");
      socket.broadcast.emit("message", "pinged");
    }
    if (data == "hack") {
      io.close();
    }
  });

  socket.on("disconnecting", () => {
    console.log("disconnected", socket.id);
    socket.broadcast.emit("message", `${socket.id} left`);
  });
});

export default eventHandler((event) => {
  event.node.res.statusCode = 200;
  event.node.res.end();
});
