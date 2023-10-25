const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');

const passport = require('passport');
// Підключення Passport та його налаштування
require('./passport-config')(passport);

app.use(passport.initialize());

// Import routes
const adminsRouter = require('./routes/admins');
const seedsRouter = require('./routes/seeds');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');

// Configs uses
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use(orderRouter);
app.use(authRouter);
app.use(adminsRouter);
app.use(seedsRouter);

// Export
module.exports = app;