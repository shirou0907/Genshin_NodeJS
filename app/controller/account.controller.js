const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_TOKEN;

module.exports.register = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var photo = req.body.photo || 'https://lh3.googleusercontent.com/a-/AOh14GjHaxUz8GQR5cFtuY_5b4Bb3o_DjmVzLt2KjvJM=s96-c';

    Account.findOne({ email: email })
    .then(data=> {
        if(data) {
            res.json("Email đã được đăng ký!")
        }
        else {
            return Account.create({
                email, password, name, photo
            })
        }
    })
    .then(data => {
        if(data) {
            res.json("Tạo tài khoản thành công")
        }
        return 
    })
    .catch(err => {
        res.status(500).json("Tạo tài khoản thất bại" + err);
    })
}

module.exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    Account.findOne({ email: email, password: password})
    .then(data => {
        if(data) {
            jwt.sign({_id: data._id}, secretkey, function(err, token) {
                if(!err) {
                    res.json({
                        auth: true,
                        token: token,
                        message: 'login successful'
                    })
                }
            });
        }
        else {
            res.status(401).json('Sai tài khoản hoặc mật khẩu')
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}