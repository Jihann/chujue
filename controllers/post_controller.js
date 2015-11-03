/**
 * Created by Jihann on 2015/11/2.
 * 文章
 */
var Post = require('../models/post');

exports.info = function(req, res, next) {
    res.render('post_create', {
        title : '文章创建页',
        post : {
            title : '',
            content : ''
        }
    });
};

exports.create = function(req, res, next) {
    console.log('---------------- add post ----------------');
    var id = req.body.post._id;
    console.log('-------------- id: ' + id + '---------------');
    var newPost = req.body.post;
    var _post;
    if (id) {
        console.log('-------------- update post ---------------');
    } else {
        console.log('-------------- create post ---------------');
        _post = new Post(newPost);
        _post.save(function(err, post) {
            if (err) {
                console.log('---------------' + err + '------------------');
            }
            res.redirect('/');
        });
    }
};

exports.list = function(req, res, next) {
    Post.fetch(function(err, posts) {
        if (err) {
           console.log('-----------' + err + '------------');
        }
        res.render('index', {
            title : '初觉',
            posts : posts
        });
    });
};
