'use strict';

const express = require('express');
const signinRouters = express.Router();
const basicAuth = require('../middlewares/basicAuth');

signinRouters.post('/signin', basicAuth, (req, res) => {
    res.status(200).json(req.user);
})

module.exports = signinRouters;