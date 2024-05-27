const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  const users = await User.find().select('username role');
  res.json(users);
});

module.exports = router;
