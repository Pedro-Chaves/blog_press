const categoriesModel = require('../models/Categories');
const articlesModel = require('../models/Articles');
const slugify = require('slugify');

exports.pagination = (req, res) => {
    let page = parseInt(req.params.page);
    let offset = (isNaN(page) || page <= 1) ? 0 : (page - 1) * 4;

    articlesModel.findAndCountAll({
        limit: 4,
        offset
    }).then(articles => {
        let next = (offset + 4 <= articles.count) ? true : false;

        let result = {
            page,
            next,
            articles
        }

        categoriesModel.findAll().then(categories => {
            res.render('admin/articles/pagination', {
                result,
                categories
            });
        });
    })
}

exports.showArticles = (req, res) => {
    articlesModel.findAll({
        include: [{model: categoriesModel}]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles
        });
    })
}

exports.createArticles = (req, res) => {
    categoriesModel.findAll().then(categories => {
        res.render('admin/articles/new', {
            categories
        });
    });
}

exports.save = (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category;

    articlesModel.create({
        title,
        slug: slugify(title),
        body,
        categoryId
    }).then(() => {
        res.redirect('/admin/articles');
    });
}

exports.delete = (req, res) => {
    let id = req.body.id;

    if(id != undefined && !isNaN(id)){
        articlesModel.destroy({
            where: {
                id
            }
        }).then(() => {
            res.redirect('/admin/articles');
        })
    } else {
        res.redirect('/admin/articles');
    }
}

exports.edit = (req, res) => {
    let id = req.params.id;

    articlesModel.findOne({
        where: {
            id
        }
    }).then(article => {
        categoriesModel.findAll().then(categories => {
            if(article == undefined) res.redirect('/');
        else {
            res.render('admin/articles/edit', {
                article,
                categories
            });
        }
        })
    })
};

exports.update = (req, res) => {
    let { id, title, body, category } = req.body;

    articlesModel.update({
        title,
        body,
        slug: slugify(title),
        categoryId: category
    }, 
    {
        where: {
            id
        }
    }).then(() => {
        res.redirect('/admin/articles');
    })
}