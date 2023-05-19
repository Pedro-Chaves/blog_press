const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/users', adminAuth, usersController.showUsers);
router.get('/admin/users/new', adminAuth, usersController.createUsers);
router.get('/users/login', usersController.login);
router.get('/users/logout', usersController.logout);
router.post('/users/save', adminAuth, usersController.save);
router.post('/users/delete', adminAuth, usersController.delete);
router.post('/users/authenticate', usersController.authenticate);

module.exports = router;