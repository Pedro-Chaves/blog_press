const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('./Categories');

const Article = db.define('articles',  {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Article.belongsTo(Category);
Category.hasMany(Article);

Article.sync({force: false});

module.exports = Article;