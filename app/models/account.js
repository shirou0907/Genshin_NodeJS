const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountModel = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    name: String, 
    photo: String, 
    role: {type: Number, default: 0}, 
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
}, {
    collection: 'account'
});

module.exports = mongoose.model('account', AccountModel);