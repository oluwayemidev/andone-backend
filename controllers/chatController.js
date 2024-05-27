const Message = require('../models/ChatMessage');

const sendMessage = async (req, res) => {
    const { sender, recipient, content } = req.body;
    try {
        const message = new Message({ sender, recipient, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};

const getMessages = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }],
        }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { sendMessage, getMessages };
