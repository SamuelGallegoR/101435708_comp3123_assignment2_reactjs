const express = require('express');
const { signup, login } = require('../controllers/UserController');
const { check } = require('express-validator');

const router = express.Router();


//User management:
// POST user signup
router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
], signup);

// POST user login
router.post('/login', login);

module.exports = router;
