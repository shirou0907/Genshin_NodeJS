const mongoose = require('mongoose');
const { Schema } = mongoose;

const Posts = new Schema({
    userID: {type: String, required: true},
    title: {type: 'String', required: true},
    description: {type: 'String', required: true},
    imgUrl: String, 
    comments: [{
        userID: {type: String, required: true},
        details: String 
    }],
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
}, {
    collection: 'posts'
});

module.exports = mongoose.model('Post', Posts);