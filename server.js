/*jshint esversion: 6 */

require('./config/mongoose.configs');
require('dotenv').config();

const path = require("path");
const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 8000;
const Crypto = require('./model/mongoose.models')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin:'*'}));
app.use(express.static(path.join(__dirname, "client", "build")))

require('./route/mongoose.routes')(app);
require('./route/user.routes')(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const server = app.listen(port, ()=> {
    console.log(`Listening to port: ${port}`)
});

const io = socket(server, {
    cors: {
        origin: '*',

    }
});

io.on("connection", socket => {
    console.log(`socket id: ${socket.id}`);
    socket.on('deleteCrypto', (payload) => {
        Crypto.deleteOne({ _id: payload })
            .then((crypto) => io.emit('cryptoDeleted', payload))
            .catch((err) => console.log('err', err));});

    socket.on("event_from_client", data => {
        socket.broadcast.emit("event", data);
    });
});

