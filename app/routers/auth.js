const express = require('express');
const AccountController = require('../controller/account.controller')
const AuthMiddleware = require('../middleware/auth.middleware')
const Account = require('../models/account')
const router = express.Router();

router.get('/', AuthMiddleware.check, (req, res) => {
    Account.findById(res.user._id)
    .then(data => res.json(data))
    .catch(err => res.status(500).json('Server Error'))
})

router.post('/login', AccountController.login);
router.post('/register', AccountController.register);

module.exports = router