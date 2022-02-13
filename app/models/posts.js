const mongoose = require('mongoose');
const { Schema } = mongoose;

const Posts = new Schema({
    userID: {type: String, required: true},
    title: {type: 'String', required: true},
    description: {type: 'String', required: true},
    imgUrl: String, 
    videoLink: String,
    comments: [{
        userID: {type: String, required: true},
        username: String,
        userimg: String,
        comment: String, 
        date: {type: Date, default: Date.now()}
    }],
}, {
    timestamps: true,
    collection: 'posts'
});

module.exports = mongoose.model('Post', Posts);