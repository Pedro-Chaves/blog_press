const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/ArticlesController');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/articles', adminAuth, articlesController.showArticles);
router.get('/admin/articles/new', adminAuth, articlesController.createArticles);
router.get('/admin/articles/edit/:id', adminAuth, articlesController.edit);
router.get('/articles/pagination/:page', articlesController.pagination);
router.post('/articles/save', adminAuth, articlesController.save);
router.post('/articles/delete', adminAuth, articlesController.delete);
router.post('/articles/update', adminAuth, articlesController.update);

module.exports = router;