var express = require('express');
var router = express.Router();
var Home = require('../controllers/home_controller');
var Auth = require('../controllers/auth_controller');
var User = require('../controllers/user_controller');
var Post = require('../controllers/post_controller');
var admin = require('../controllers/admin_controller');

// Index
router.get('/', Post.list);
router.get('/home', Home.index);

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

// 根据用户id获取他当日发表的初觉
router.get('/user/:id', Home.info);
router.get('/detail/:id', Home.detail);

/////////////////////////////////////////
router.get('/admin', admin.index);
router.get('/index1', Home.index1);
router.get('/index2', Home.index2);
router.get('/index3', Home.index3);



///表单构建器
router.get('/biao', Home.biao);
router.get('/biao1', Home.biao1);
router.get('/biao2', Home.biao2);
router.get('/biao3', Home.biao3);

router.get('/xiang1', Home.xiang1);
router.get('/xiang2', Home.xiang2);
router.get('/xiang3', Home.xiang3);
router.get('/xiang4', Home.xiang4);

module.exports = router;
