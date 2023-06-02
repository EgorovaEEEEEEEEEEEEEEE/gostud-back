const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const loginRoute = require('./login/login.route');
const signupRoute = require('./signup/signup.route');
const userRoute = require('./user/user.route');
const clubsRoute = require('./clubs/clubs.route');
const clubRoute = require('./club/club.route');
const chatsRoute = require('./chats/chats.route');

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/login', loginRoute);
    app.use('/api/signup', signupRoute);
    app.use('/api/user/:username', userRoute);
    app.use('/api/club', clubRoute);
    app.use('/api/chat', chatsRoute);
}