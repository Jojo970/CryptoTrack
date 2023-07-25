require('dotenv').config();
const mongoDbUrl = process.env.MONGODB_URI
const mongoose = require('mongoose');


const mongoEndpoint = 'mongodb://localhost/';
const db = 'cryptowatcher';

mongoose
    .connect(mongoDbUrl)
    .then(() => console.log('Connection to Database Established'))
    .catch((err) => console.log('Error in connecting to database', err));