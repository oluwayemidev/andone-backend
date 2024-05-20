// controllers/messageController.js
const Message = require('../models/Message');

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('user');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new message
exports.createMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
