import { Server } from "socket.io";
import crypto from "node:crypto";
import { Chat } from "../models/chat.js";
import ConnectionRequest from "../models/connectionRequests.js";

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //?Handle events

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      //?STEP1 ==> CREATE A ROOM OVER HERE.Whenever any chat happens,it happens inside a room.In that room there are some Participants.A room also has unique roomId.One connection is established in a particular room.
      //!If Virat is connecting to Dhoni their room should be different,Basically I need to create the Separate rooms of different Individuals.
      //?STEP2 ==> ASSIGNING A UNIQUE ID TO THE ROOM.FOR CREATING THIS UNIQUE ID, that's why I need the id of both the Users.Basically I am trying to create a connection between one userId and other userId.That's why I need to create the Room just for these 2 people.
      //&This code will be called by 1000's of people simultaneously,How will you know which person wants to chat with whom??And How do you connect both of them.You basically connect via room.This room will have a unique id.
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + "Joined Room : " + roomId);
      //?STEP3 ==> JOINING THE ROOM.
      //?Now If Ron will send message to Virat, it will go to Virat and If Virat will send message to this room, It will go to Ron.These 2 people are connected to the same roomId.
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          //?Suppose Virat wants to send message to Ron,So Virat emiited this sendMessage event from the frontend to our backend server,now backend has to make sure that it is sending the message back to Ron.
          //?STEP1 ==> Whatever message I have got from the frontend I want to send it to a particular room.

          //?STEP2 ==> SETTING UP THE ROOM ID ONCE AGAIN
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text);

          //TODO Check if userId & targetUserId are friends

          //!When someone sends the message to the Server.We will save those messages into our database.
          //!CASE1 ==> If I am getting this sendMessage event there is a possibility that I am sending my first message ever to someone.It can be the first message.

          //!CASE2 ==> There can be an existing chat,where I want to append messages.

          //*If I am getting a message over here,I need to find out whether this chat exist earlier or not.If it exists push there.If the chat does'not exist, create a new One.

          let chat = await Chat.findOne({
            participants: {
              $all: [userId, targetUserId],
            },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          //?STEP3 ==> SENDING THE MESSAGE TO A PARTICULAR ROOM AND EMIITING THE MESSAGERECEIVED EVENT
          //?Now here we are emitting the messageReceived Event, I will listen to this event in my frontend / on the client side.
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (error) {
          console.log(error);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};
