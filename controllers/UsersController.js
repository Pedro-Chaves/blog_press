const usersModel = require('../models/Users');
const categoriesModel = require('../models/Categories');
const bcrypt = require('bcryptjs');

exports.showUsers = (req, res) => {
    usersModel.findAll().then(users => {
        res.render('admin/users/index', {
            users
        });
    });
}

exports.createUsers = (req, res) => {
    res.render('admin/users/new');
}

exports.save = (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    usersModel.findOne({
        where: {
            email
        }
    }).then(user => {
        if(user != undefined) res.render('admin/users/new');
        else {
            usersModel.create({
                email,
                password: hash
            }).then(() => {
                res.redirect('/');
            });
        }
    })
}

exports.delete = (req, res) => {
    let id = req.body.id;

    if(id != undefined && !isNaN(id)){
        usersModel.destroy({
            where: {
                id
            }
        }).then(() => {
            res.redirect('/admin/users');
        })
    } else {
        res.redirect('/admin/users');
    }
}

exports.login = (req, res) => {
    categoriesModel.findAll().then(categories => {
        res.render('admin/users/login', {
            categories
        });
    })
}

exports.logout = (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
}

exports.authenticate = (req, res) => {
    let { email, password } = req.body;

    usersModel.findOne({
        where: {
            email
        }
    }).then(user => {
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password);

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                res.redirect('/admin/articles');
            } else {
                res.redirect('/users/login');
            }
        } else {
            res.redirect('/users/login');
        }
    })
}