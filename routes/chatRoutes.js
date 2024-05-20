const express = require('express');
const { sendMessage, getChats } = require('../controllers/chatController');
const router = express.Router();

module.exports = (io) => {
  router.post('/', sendMessage);
  router.get('/:userId', getChats);

  return router;
};
