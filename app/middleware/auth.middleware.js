const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_TOKEN;

//Check Bearer Token
module.exports.check = function(req, res, next) {
    var header = req.headers['authorization'];
    if(header) {
        var token = header.split(' ')[1];
        jwt.verify(token, secretkey, function(err, data) {
            if(!err) {
                res.user = data;
                next()
                return
            }
            else {
                res.status(401).json({auth: false, message: 'Unauthorized'})
            }
        })
    }
    else {
        res.status(401).json({auth: false, message: 'Unauthorized'})
    }
}