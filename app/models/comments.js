const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comments = new Schema({
    postID: { type: String, required: true},
    userID: { type: String, required: true},
    comment: { type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
}, {
    collection: 'comments',
})

module.exports = mongoose.model('comments', Comments);