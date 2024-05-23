const express = require('express');
const { createContactMessage, getContactMessages } = require('../controllers/contactController');
const router = express.Router();

router.post('/', createContactMessage);
router.get('/', getContactMessages);

module.exports = router;
