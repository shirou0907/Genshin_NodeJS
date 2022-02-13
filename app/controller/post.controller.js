const Post = require('../models/posts')
const Account = require('../models/account')

module.exports.getAll = async (req, res) => {
    var data = await Post.find({})
        res.json(data);
}

module.exports.getAll2 = async (req, res) => {
    var data = await Post.find({})
        res.json(data.reverse());
}

module.exports.getPostById = async (req, res) => {
    var data = await Post.findById(req.params.id);
    data.createdAt = data.createdAt.toLocaleString()
    var user = await Account.find({_id: data.userID})
    var data2 = JSON.parse(JSON.stringify(data));
    data2.username = user[0].email
    data2.userimg = user[0].photo
    data2.createdAt = new Date(data2.createdAt).toLocaleString();
    data2.updatedAt = new Date(data2.updatedAt).toLocaleString();
    data2.comments.map(e=> {
        e.date = new Date(e.date).toLocaleString();
    })
    data2.comments.reverse()
    res.json(data2)
}

module.exports.add = (req, res, next) => {
    var userID = req.params.id
    var title = req.body.title
    var description = req.body.description
    var img = req.body.img || ""
    var video = req.body.video || ""
    
    Post.create({ 
        userID: userID,
        title: title,
        description: description,
        imgUrl: img, 
        videoLink: video
    }).then(data => {
        if(data) {
            res.json('Upload Success')
            return
        }
    }) 
    .catch(err => {
        res.status(500).json("Server Error")
    })
}

module.exports.update = (req, res) => {
    var id = req.params.id
    var title = req.body.title 
    var description = req.body.description 
    var img = req.body.img 
    var video = req.body.video || ""

    Post.updateOne({_id: id}, {$set: { title: title, description: description, imgUrl: img, videoLink: video }})
    .then(data=> {
        if(data) return res.json('Update Success')
    })
    .catch(err => {
        res.status(500).json("Server Error")
    })
}

module.exports.delete = (req, res) => {
    Post.deleteOne({_id: req.params.id})
    .then(data => {
        res.json('Delete Success')
    })
    .catch(err => {
        res.status(500).json("Server Error")
    })
}