const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('categories',  {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({force: false});

module.exports = Category;