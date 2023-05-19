const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('users',  {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: false});

module.exports = User;