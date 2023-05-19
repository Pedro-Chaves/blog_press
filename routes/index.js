const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);
router.get('/:slug', indexController.listArticle);

module.exports = router;