const mongoose = require('mongoose');

const connConfig = "mongodb://localhost:27017/mern-practice-DB";
const conn = mongoose.createConnection(connConfig);

conn.on('connected', () => {
    console.log('mern-practice-DB connected successfully');
});

conn.on('error', (err) => {
    console.log('Error in connecting to mern-practice-DB: ' + err);
});

module.exports = conn;