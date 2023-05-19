const articlesModel = require('../models/Articles');
const categoriesModel = require('../models/Categories');

exports.home = (req, res) => {
    articlesModel.findAll({
        order: [[
            'id', 'DESC'
        ]],
        limit: 4
    }).then(articles => {
        categoriesModel.findAll().then(categories => {
            res.render('index', {
                articles,
                categories
            });
        });
    })
}

exports.listArticle = (req, res) => {
    let slug = req.params.slug
    articlesModel.findOne({
        where: {
            slug
        }
    }).then(article => {
        if(article == undefined) res.redirect('/');
        else {
            categoriesModel.findAll().then(categories => {
                res.render('article', {
                    article,
                    categories
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    })
}
