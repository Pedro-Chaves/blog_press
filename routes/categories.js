const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/CategoriesController');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/categories', adminAuth, categoriesController.showCategories);
router.get('/admin/categories/new', adminAuth, categoriesController.createCategories);
router.get('/admin/categories/edit/:id', adminAuth, categoriesController.edit);
router.get('/categories/:slug', categoriesController.listArticlesByCategory);
router.post('/categories/save', adminAuth, categoriesController.save);
router.post('/categories/delete', adminAuth, categoriesController.delete);
router.post('/categories/update', adminAuth, categoriesController.update);

module.exports = router;