const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    var email = req.body.email;
    res.json(email);
})

module.exports = router