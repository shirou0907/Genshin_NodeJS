const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_TOKEN;
const bcrypt = require('bcryptjs');

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
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if(!err) {
                        Account.create({
                            email: email, password: hash, name: name, photo: photo
                        })
                        .then(data => {
                            if(data) {
                                res.json("Tạo tài khoản thành công")
                            }
                            return 
                        })
                    }
                });
            });
        }
    })
    .catch(err => {
        res.status(500).json("Tạo tài khoản thất bại" + err);
    })
}

module.exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    Account.findOne({ email: email})
    .then(data => {
        if(data) {
            var hashPassword = data.password
            bcrypt.compare(password, hashPassword, function(err, result) {
                // result === true
                if(result) {
                    jwt.sign({_id: data._id}, secretkey, function(error, token) {
                        if(!error) {
                            res.json({
                                auth: true,
                                token: token,
                                message: 'login successful'
                            })
                        }
                    });
                }
                else {
                    res.status(401).json('Sai tài khoản hoặc mật khẩu!')
                }
            });
        } else {
            res.status(401).json('Sai tài khoản hoặc mật khẩu!')
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

module.exports.getInfo = async(req, res, next) => {
    var data = await Account.findById(req.body.id)
    res.json({name: data.name, photo: data.photo, email: data.email})
}

module.exports.update = async(req, res, next) => {
    var id = req.body.id
    var password = req.body.password;
    var name = req.body.name;
    var photo = req.body.photo;
    var hash = bcrypt.hashSync(password, 10);

    var data = await Account.updateOne({_id: id}, {$set: {password: hash, name: name, photo: photo}})
    if(data) return res.json('Update Success')
}

module.exports.destroy = async(req, res) => {
    var id = req.params.id
    var data = await Account.deleteOne({_id: id})
    if(data) return res.json('Delete Success')
}