const User = require("../models/User");
const { createChat } = require("../utils/Gemini");

exports.generateChatCompletionWithGemini = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUserChat = {
      content: message,
      role: "user",
    };
    user.chats.push(newUserChat);

    const response = await createChat(message);

    const newBotChat = {
      content: response,
      role: "shayak",
    };
    user.chats.push(newBotChat);

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error in generateChatCompletionWithGemini:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.sendChatsToUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.error("Error in sendChatsToUser:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "Chats deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChats:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};