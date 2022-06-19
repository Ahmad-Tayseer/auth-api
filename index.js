'use strict';

require('dotenv').config();
const server = require('./auth/server');
const PORT = process.env.PORT || 3000;
const { sequelize } = require('./auth/models/index.model');

sequelize.sync().then(() => {
    server.start(PORT);
}).catch(console.error);