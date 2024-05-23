const Contact = require('../models/contactModel');

// Create a contact message
const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contactMessage = new Contact({ name, email, subject, message });
    await contactMessage.save();
    res.status(201).json({ message: 'Contact message created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all contact messages
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
};
