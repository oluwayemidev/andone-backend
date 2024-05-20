const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getUsers);
router.post('/login', authUser);
router.post('/register', registerUser);

module.exports = router;
