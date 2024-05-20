// controllers/chatController.js
const asyncHandler = require('express-async-handler');
const Chat = require('../models/ChatMessage');
const User = require('../models/User');

// Fetch messages for a chat
const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const admin = await User.findOne({ role: 'admin' });

  const chat = await Chat.findOne({ users: { $all: [req.user._id, userId] } })
    .populate('users', 'name')
    .populate('messages.sender', 'name');

  if (chat) {
    res.json(chat.messages);
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  const admin = await User.findOne({ role: 'admin' });

  let chat = await Chat.findOne({ users: { $all: [req.user._id, userId] } });

  if (!chat) {
    chat = new Chat({ users: [req.user._id, userId, admin._id] });
  }

  const newMessage = {
    sender: req.user._id,
    content,
  };

  chat.messages.push(newMessage);
  await chat.save();

  res.status(201).json(newMessage);
});

module.exports = { getMessages, sendMessage };
