import { Server } from "socket.io";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //?Handle events

    socket.on("joinChat", () => {

    });

    socket.on("sendMessage", () => {

    });

    socket.on("disconnect", () => {
      
    })
  });
};
