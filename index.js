const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');

const articles = require('./routes/articles');
const categories = require('./routes/categories');
const index = require('./routes/index');
const users = require('./routes/users');

const articlesModel = require('./models/Articles');
const categoriesModel = require('./models/Categories');
const usersModel = require('./models/Users');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
    secret: 'session_secret',
    cookie: {
        maxAge: 300000
    }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

db.authenticate().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
})

app.use('/', articles);
app.use('/', categories);
app.use('/', index);
app.use('/', users);

app.listen(8080, () => {
    console.log('Application Running');
})