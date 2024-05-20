const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');

const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, content });
    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    });

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { sendMessage, getChats };
