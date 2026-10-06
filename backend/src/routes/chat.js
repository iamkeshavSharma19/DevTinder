import { Router } from "express";
import { Chat } from "../models/chat.js";
import { userAuth } from "../middlewares/auth.js";

const chatRouter = Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;
    let chat = await Chat.findOne({
      participants: {
        $all: [userId, targetUserId],
      },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName"
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }

    res.json(chat);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default chatRouter;
