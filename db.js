const sequelize = require('sequelize');

const connection = new sequelize('blog_press', 'root', 'pe102030', {
    root: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
})

module.exports = connection;