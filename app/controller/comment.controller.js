const Comment = require('../models/comments')

module.exports.getAllByPostId = (req, res, next) => {
    Comment.find({postId: req.body.id})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server Error')
    })
}

module.exports.create = (req, res, next) => {
    var userId = req.body.id
    var comment = req.body.comment
    var postId = req.body.postId 

    Comment.create(userId, comment, postId)
}