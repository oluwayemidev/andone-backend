const express = require('express');
const { registerUser, authUser, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
