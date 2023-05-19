const slugify = require('slugify');
const categoriesModel = require('../models/Categories');
const articlesModel = require('../models/Articles');

exports.showCategories = (req, res) => {
    categoriesModel.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories
        });
    })
}

exports.createCategories = (req, res) => {
    res.render('admin/categories/new');
}

exports.save = (req, res) => {
    let title = req.body.title;

    if(title != undefined){
        categoriesModel.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('/admin/categories/new');
    }
}

exports.delete = (req, res) => {
    let id = req.body.id;

    if(id != undefined && !isNaN(id)){
        categoriesModel.destroy({
            where: {
                id
            }
        }).then(() => {
            res.redirect('/admin/categories');
        })
    } else {
        res.redirect('/admin/categories');
    }
}

exports.edit = (req, res) => {
    let id = req.params.id;

    if(isNaN(id)) res.redirect('/admin/categories');

    categoriesModel.findByPk(id).then(category => {
        if(category != undefined){
            res.render('admin/categories/edit', {
                category
            });
        } else {
            res.redirect('/admin/categories');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/categories');
    })
}

exports.update = (req, res) => {
    let { id, title } = req.body;

    categoriesModel.update({
        title,
        slug: slugify(title)
    }, 
    {
        where: {
            id
        }
    }).then(() => {
        res.redirect('/admin/categories');
    })
}

exports.listArticlesByCategory = (req, res) => {
    let slug = req.params.slug
    categoriesModel.findOne({
        where: {
            slug
        },
        include: [{
            model: articlesModel
        }]
    }).then(category => {
        if(category == undefined) res.redirect('/');
        else {
            categoriesModel.findAll().then(categories => {
                res.render('index', {
                    articles: category.articles,
                    categories
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    })
}