const Post = require('../models/posts')

module.exports.create = (req, res, next) => {
    var userID = req.body.userID
    var comment = req.body.comment
    var postID = req.body.postID 
    var username = req.body.username
    var userimg = req.body.userimg

    Post.updateOne({_id: postID}, {$push: {comments: {userID: userID, username: username, userimg: userimg, comment: comment}}})
    .then(data => {
        if(data) return res.json('Success')
    })
    .catch(err => res.status(500).json('Server Error'))
}

module.exports.delete = (req, res, next) => {
    var id = req.body.id
    var postID = req.body.postID 

    Post.updateOne(postID, {$pull: {comments: {_id: id}}})
    .then(data => {
        if(data) return res.json('Success')
    })
    .catch(err => res.status(500).json('Server Error'))
}