const express = require('express');
const router = express.Router();
const signupController = require('./signup.controller');

router.post('/', signupController.signUp);

module.exports = router;