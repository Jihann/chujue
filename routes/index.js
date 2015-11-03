var express = require('express');
var router = express.Router();
var Auth = require('../controllers/auth_controller');
var User = require('../controllers/user_controller');
var Post = require('../controllers/post_controller');

// Index
router.get('/', Post.list);

// Post
router.get('/post', Post.info);
router.post('/post', Post.create);

// User
router.post('/user/signin', User.signin);
router.post('/user/signup', User.signup);
router.get('/signin', User.showSignin);
router.get('/signup', User.showSignup);
router.get('/logout', User.logout);
router.get('/admin/user/list', Auth.signinRequired, Auth.adminRequired, User.list);

// 账户设置
router.get('/user/mod', User.userModInfo);
router.post('/user/mod', User.userMod);

// 头像上传
router.get('/mod/head/:id', User.headInfo);
router.post('/mod/head', User.saveHead, User.headMod);

module.exports = router;
