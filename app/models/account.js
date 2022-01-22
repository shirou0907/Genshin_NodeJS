const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountModel = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    name: String, 
    photo: String, 
    created_at: {type: Date, default: new Date.now()},
    updated_at: {type: Date, default: new Date.now()}
}, {
    collection: 'account'
});

module.exports = mongoose.model('account', AccountModel);