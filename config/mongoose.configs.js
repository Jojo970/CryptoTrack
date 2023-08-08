require('dotenv').config();
const mongoDbUrl = process.env.MONGODB_URI
const mongoose = require('mongoose');


mongoose
    .connect(mongoDbUrl)
    .then(() => console.log('Connection to Database Established'))
    .catch((err) => console.log('Error in connecting to database', err));