const Post = require('../models/posts')

module.exports.getAll = async (req, res) => {
    var data = await Post.find({})
    res.json(data);
}

module.exports.getPostById = async (req, res) => {
    var data = await Post.findById(req.params.id);
    res.json(data);
}

module.exports.add = (req, res, next) => {
    var userID = req.params.id
    var title = req.body.title
    var description = req.body.description
    var img = req.body.img || ""
    
    Post.create({ 
        userID: userID,
        title: title,
        description: description,
        imgUrl: img
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

    Post.updateOne({_id: id}, {$set: { title: title, description: description, imgUrl: img}})
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