'use strict';

require('dotenv').config();
const { sequelize, DataTypes } = require('./index.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'anything';


const users =
    sequelize.define('Customers', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        token: {
            type: DataTypes.VIRTUAL,
            // get() {return jwt.sign({ username: this.username }), SECRET;}
        },

        role: {
            type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
            defaultValue: 'user',
          },

        actions: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ['read'],
                    writer: ['read', 'create'],
                    editor: ['read', 'create', 'update'],
                    admin: ['read', 'create', 'update', 'delete']
                }
                return acl[this.role];
            }
        }
    });


users.authenticateBasic = async function (username, password) {
    const user = await users.findOne({ where: { username: username } })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, SECRET);
        // console.log('************************', newToken);
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}

users.authenticateBearer = async function (token) {
    // console.log("333333333333333333333333333333333333",token);
    const parsedToken = jwt.verify(token, SECRET);
    // console.log('parsedToken >>>>>>>>>>>>>>>>>>', parsedToken);
    const user = await users.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
        // console.log("888888888888888888888888888888888888888888888");
        return user;
    } else {
        throw new Error("Invalid Token");
    }
}


module.exports = { users: users };

