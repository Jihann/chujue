/**
 * Created by Jihann on 2015/11/1.
 */
var User = require('../models/user');

exports.showSignin = function(req, res, next) {
    res.render('signin', {
       title : '用户登录页'
    });
};

exports.signup = function(req, res, next) {
    var _user = req.body.user;

    res.redirect('/');
};
