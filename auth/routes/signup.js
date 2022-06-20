'use strict';

const express = require('express');
const signupRouters = express.Router();
const { users } = require('../models/users.model');
const bcrypt = require('bcrypt');

signupRouters.post('/signup', async (req, res) => {
  try {
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);
    // console.log('username', username);
    // console.log('password', password);
    let role = req.body.role;
    const record = await users.create({
      username: username,
      password: password,
      role: role,
    });
    res.status(201).json(record);

    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // const record = await users.create(req.body);
    // res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User, Try Another Username'); }

})

module.exports = signupRouters;


