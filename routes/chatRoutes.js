// routes/chatRoutes.js
const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:userId').get(protect, getMessages);
router.route('/:userId').post(protect, sendMessage);

module.exports = router;
