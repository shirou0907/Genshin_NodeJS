const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_TOKEN;
const bcrypt = require('bcryptjs');

module.exports.register = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var photo = req.body.photo || 'https://i.pinimg.com/originals/8f/24/d3/8f24d3d652b45166721c3f1cc8b45c38.jpg';
    
    Account.findOne({ email: email })
    .then(data=> {
        if(data) {
            res.status(501).json("Email đã được đăng ký!")
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
    
    var name = req.body.name;
    var photo = req.body.photo;
    var data = await Account.updateOne({_id: id}, {$set: {name: name, photo: photo}})
    if(data) return res.json('Update Success')
}

module.exports.destroy = async(req, res) => {
    var id = req.params.id
    var data = await Account.deleteOne({_id: id})
    if(data) return res.json('Delete Success')
}

module.exports.changePassword = async(req, res) => {
    var id = req.body.id;
    var oldPassword = req.body.oldPassword;
    var password = req.body.password;
    if(password) {
        var hash = bcrypt.hashSync(password, 10);
    }
    var result = await Account.findOne({_id: id})
    bcrypt.compare(oldPassword, result.password, async (err, check) => {
        if(!check) {
            res.status(403).json('Mật khẩu cũ không chính xác!')
        }
        else {
            var data = await Account.updateOne({_id: id}, {$set: {password: hash}})
            if(data) return res.json('Update Success')
        }
    })
}