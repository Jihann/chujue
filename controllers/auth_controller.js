/**
 * Created by Jihann on 2015/11/2.
 * 用户权限中间件
 */

//用户登录权限
exports.signinRequired = function(req, res, next) {
    var loginUser = req.session.user;
    if (!loginUser) {
        res.redirect('/signin');
    }
    next();
};

//管理员权限
exports.adminRequired = function(req, res, next) {
    var loginUser = req.session.user;
    if (!loginUser) {
        return res.redirect('/admin/login');
    } else if (loginUser && loginUser.role <= 50) {
        return res.redirect('/admin/login');
    }
    next();
};