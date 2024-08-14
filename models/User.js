const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(), 
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
    default: "Student", 
  },
  chats: [chatSchema], 
  token: {
    type: String,
  }
}, { timestamps: true }); 

module.exports = mongoose.model("User", userSchema);