'use strict';
const { users } = require("../models/users.model");

module.exports = async (req, res, next) => {

    try {
  
      if (!req.headers.authorization) { next('Invalid Login') }
  
      const token = req.headers.authorization.split(' ').pop();
      // console.log("22222222222222222222222222222222222", token);
      const validUser = await users.authenticateBearer(token);
      console.log("4444444444444444444444444444444444", validUser);
      req.user = validUser;
      req.token = validUser.token;
      next();
  
    } catch (e) {
      console.error(e);
      res.status(403).send('Invalid Login');
    }
  }
  