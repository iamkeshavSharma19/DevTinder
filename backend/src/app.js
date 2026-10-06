import dotenv from "dotenv";
dotenv.config({ quiet: true });

//import "dotenv/config"; // 👈 Bass single top-line import!
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";

import cors from "cors";
import http from "node:http";
import { initializeSocket } from "./utils/socket.js";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import paymentRouter from "./routes/payment.js";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 7777;

//?Adding some more configurations inside the cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

//?Creating a server using http module for the socket.io
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established...");

    server.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`App is listening on Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
