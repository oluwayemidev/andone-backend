const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser, updateUser } = require('../controllers/adminController');

router.route('/users').get(getUsers);
router.route('/users/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
