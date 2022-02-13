const mongoose = require('mongoose');
const url = process.env.URI;

const connectDB = async() => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected MongooDB Successfully')
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connectDB }