const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const authRouter = require('./app/routers/auth')
const userRouter = require('./app/routers/user')
const db = require('./app/config/db')

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cors({
    origin:true,
    credentials:true
}));

db.connectDB();

app.use('/api', authRouter);
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})