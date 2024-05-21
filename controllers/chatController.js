const asyncHandler = require('express-async-handler');
const Chat = require('../models/ChatMessage');
const User = require('../models/User');
const io = require('../socket');

// Fetch messages for a chat
const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;

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

  let chat = await Chat.findOne({ users: { $all: [req.user._id, userId] } });

  if (!chat) {
    chat = new Chat({ users: [req.user._id, userId] });
  }

  const newMessage = {
    sender: req.user._id,
    content,
  };

  chat.messages.push(newMessage);
  await chat.save();

  const populatedMessage = await chat.populate('messages.sender', 'name').execPopulate();

  const latestMessage = populatedMessage.messages[populatedMessage.messages.length - 1];
  io.getIO().emit('message', latestMessage);

  res.status(201).json(latestMessage);
});

module.exports = { getMessages, sendMessage };
