const dotenv = require('dotenv').config();
const app = require('./app');

// Database
const mongoose = require('mongoose');

// API
const start = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(process.env.API_PORT, () => {
            console.log(`API started in port ${process.env.API_PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
};

start();