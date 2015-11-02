var express = require('express');
var router = express.Router();
var User = require('../controllers/user_controller');

// Index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// User
router.post('/user/signup', User.signup);
router.get('/signin', User.showSignin);

module.exports = router;
