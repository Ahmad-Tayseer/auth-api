'use strict';

const express = require('express');
const secretStuffRouters = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');

secretStuffRouters.get('/secret', bearerAuth, (req, res) => {
    console.log("55555555555555555555555555555555");
    res.status(200).json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
})

module.exports = secretStuffRouters;