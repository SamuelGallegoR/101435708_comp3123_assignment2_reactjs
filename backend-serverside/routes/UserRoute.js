const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/UserController');
const { check } = require('express-validator');

const router = express.Router();

// User management:
// POST user signup
router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], signup);

// POST user login
router.post('/login', login);

// GET all users
router.get('/users', getAllUsers);

module.exports = router;
