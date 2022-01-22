const express = require('express');
const AccountController = require('../controller/account.controller')
const router = express.Router();

router.post('/login', AccountController.login);
router.post('/register', AccountController.register);

module.exports = router