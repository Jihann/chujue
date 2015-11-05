/**
 * Created by Jihann on 2015/11/1.
 */
var User = require('../models/user');

//属性继承
var _ = require('underscore');

//上传
var fs = require('fs');
var path = require('path');


exports.showSignin = function(req, res, next) {
    res.render('signin', {
       title : '用户登录页'
    });
};

exports.showSignup = function(req, res, next) {
    res.render('signup', {
       title : '用户注册页'
    });
};

//用户登录
exports.signin = function(req, res, next) {
    var _user = req.body.user;
    var email = _user.email;
    var password = _user.password;
    console.log('------------ email: ' + email + '-------------');
    User.findOne({email : email}, function(err, user) {
        if (err) {
            console.log('-----------------' + err + '-------------------');
        }
        if (!user) {
            console.log('------------- user is not exists ------------');
            return res.redirect('/signin');
        }
        if (user.password !== password) {
            console.log('------------- password is not matched ------------');
            return res.redirect('/signin');
        } else {
            console.log('------------- password is matched ------------');
            req.session.user = user; //保持当前会话状态
            //判断登录用户权限 role >=50 super admin
            if (user.role && user.role >= 50) {
                return res.redirect('/admin/user/list');
            }
            return res.redirect('/');
        }
    });
};

//用户注册
exports.signup = function(req, res, next) {
    var _user = req.body.user;
    User.findOne({email : _user.username}, function(err, user) {//判断用户是否存在
        console.log(user);
        if (err) {
            console.log('--------------' + err + '--------------');
        }
        if (user) { //如果用户存在
            console.log('------------ user is not null ----------');
            return res.redirect('/signin');
        }
        var user = new User(_user);
        user.username = _user.email;
        user.save(function(err, user) { //save
            if (err) {
                console.log('--------------' + err + '--------------');
            }
            res.redirect('/signin');
        })
    });
};

//后台用户列表页
exports.list = function(req, res, next) {
    console.log('-------------- userlist --------------');
    User.fetch(function(err, users) {
        if (err) {
            console.log('--------------' + err + '---------------');
        }
        res.render('user_list', {
            title : '初觉-后台用户列表页',
            users : users
        });
    });
};


//用户注销
exports.logout = function(req, res, next) {
    delete req.session.user;
    return res.redirect('/home');
};


//上传头像-图片中间件
exports.saveHead = function(req, res, next) {
    //获取头像属性对象
    var headData = req.files.uploadHead;
    console.log(headData);
    //获取头像图片地址
    var filePath = headData.path;
    console.log(filePath);
    //获取文件名称
    var originalname = headData.originalname;

    if (originalname) {
        console.log('-------------- 开始上传 --------------');
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now(); //获取当前系统时间
            var type = headData.mimetype.split('/')[1]; //获取文件类型
            console.log('-----------文件类型为：' + type + '-------------');
            var reHeadData = timestamp + '.' + type;
            console.log('---------- 重命名后的头像名称: ' + reHeadData + '-----------');
            //上传服务器文件路径
            var newPath = path.join(__dirname, '../', '/public/upload/' + reHeadData);
            fs.writeFile(newPath, data, function(err) {
                if (err) {
                    console.log('---------- ' + err + '-----------');
                }
                req.poster = reHeadData; //将重命名后的文件名称传到下一个请求中
                next();
            });
        });
    } else {
        next();
    }
};

exports.userModInfo = function(req, res, next) {
    console.log('-------------- 个人账号设置 ---------------');
    var currentUser = req.session.user;
    if (currentUser) {
        User.findOne({email : currentUser.email}, function(err, user) {
            if (err) {
                console.log('------------' + err + '-------------');
            }
            res.render('post_list', {
                title : '账号设置',
                user : user
            });
        });
    }
};

//资料修改
exports.userMod = function(req, res, next) {
    var id = req.body._id;
    var newUser = {
        nickname : req.body.nickname,
        sex : req.body.sex,
        signature : req.body.signature
    };
    if (id && '' !== id) {
        console.log('------ update id = ' + id + '------------');
        User.findByIdAndUpdate(id, newUser, function(err, docs) {
            if (err) {
                console.log('----------------' + err + '------------------');
            }
            res.redirect('/user/mod');
        });
    }
};

exports.headInfo = function(req, res, next) {
    var id = req.params.id;
    if (id) {
        User.findById({_id : id}, function(err, user) {
            if (err) {
                console.log('----------------' + err + '------------------');
            }
            res.render('mod_head', {
                title : '修改头像',
                user : user
            });
        });
    }
};

//上传头像
exports.headMod = function(req, res, next) {
    var userId = req.body.userId;
    var newUser;
    if (req.poster) {
        console.log('------------ poster ' + req.poster + '-----------');
        newUser = {
            header : req.poster
        };
    }
    if (userId) {
        User.findByIdAndUpdate(userId, newUser, function(err, docs) {
            if (err) {
                console.log('----------------' + err + '------------------');
            }
            res.redirect('/user/mod');
        });
    } else {
        res.redirect('/user/mod');
    }
};

