/**
 * Created by Jihann on 2015/11/6.
 */

// 管理员后台首页
exports.index = function(req, res, next) {
    res.render('mgr/index');
};

// 管理员后台登录
exports.login = function(req, res, next) {
    res.render('mgr/login');
};

// 管理员 后台注册
exports.register = function(req, res, next) {
    res.render('mgr/register');
};

// 用户锁定
exports.lockscreen = function(req, res, next) {
    res.render('mgr/lockscreen');
};

// 判断用户登录锁定状态
exports.loginAgain = function(req, res, next) {
    var loginUser = req.session.user;
    var password = req.body.password;
    if (loginUser) {
        if (loginUser.password === password) {
            console.log('-------------- login again --------------');
            res.redirect('/admin');
        } else {
            res.redirect('/lockscreen');
        }
    } else {
        res.redirect('/lockscreen');
    }
};