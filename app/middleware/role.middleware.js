const Account = require('../models/account');

module.exports.checkRole = (req, res, next) => {
    Account.findById(res.user._id)
    .then(data => {
        if(data.role > 0) {
            next()    
        }
        else {
            res.status(401).json('Tài khoản không có quyền truy cập!')
        }
    })
    .catch(err => {
        res.status(500).json('Server Error')
    })
}