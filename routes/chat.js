const express = require('express');
const chatController = require('../controllers/chatController');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', chatController.getMessages);
  router.post('/', chatController.addMessage);

  return router;
};
