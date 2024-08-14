const express = require("express");
const router = express.Router();
const chatController = require('../controllers/chatController');
const { auth } = require("../middlewares/authMiddleware"); 

router.use(auth);

router.post(
  "/new",
  chatController.generateChatCompletionWithGemini
);
router.get("/all-chats", chatController.sendChatsToUser);
router.delete("/delete", chatController.deleteChats);

module.exports = router;