/**
 * Created by Jihann on 2015/11/4.
 */

var Post = require('../models/post');

// chujue 文章和用户关联查询
exports.index = function(req, res, next) {
    console.log('-------------- home show --------------');
    Post.find({})
        .populate({
            path: 'user'
        })
        .sort({ 'meta.updatedAt' : -1})
        .exec(function(err,  posts) {
            if (err) {
                console.log('-----------------' + err + '-----------------');
            }
            // 去重算法<这段时间都忘了一些基础，看来得好好补补>
            var results = [];
            var hash = {};
            for (var i = 0; i < posts.length; i++) { //遍历文章集合
                var post = posts[i];
                var key = post.user; // 文章发表者
                if (hash[key] !== 1) {
                    results.push(post);
                    hash[key] = 1;
                }
            }
            res.render('home', {
                title : '初觉',
                posts : results
            });
        });
};

//
exports.info = function(req, res, next) {
    console.log('---------------- user article info ----------------');
    var id = req.params.id;
    if (id) {
        Post.find({user: id})
            .populate({
                path : 'user'
            })
            .sort({'meta.updatedAt' : -1})
            .exec(function(err, posts) {
                if (err) {
                    console.log('-----------------' + err + '--------------------');
                }
                res.render('article_list', {
                    title : '初觉 - ME',
                    posts : posts
                });
            });
    }
};


exports.detail = function(req, res, next) {
    console.log('--------------- user article detail info ----------------');
    var id = req.params.id;
    if (id) {
        Post.findOne({_id : id})
            .populate({
                path : 'user'
            })
            .exec(function(err, post) {
                if (err) {
                    console.log('---------------' + err + '-----------------');
                }
                res.render('article_detail', {
                    title : '初觉 - 感动',
                    post : post
                });
            });
    }
};

/////////////////////////////////////////////////

//js 这玩意出现问题首先看报啥错，然后追踪，例如先看浏览器控制台报错信息
exports.index1 = function(req, res, next) {
    res.render('mgr/index_v1');
};

exports.index2 = function(req, res, next) {
    res.render('mgr/index_v2');
};


exports.index3 = function(req, res, next) {
    res.render('mgr/index_v3');
};

exports.biao = function(req, res, next) {
    res.render('mgr/form_builder');
};

exports.biao1 = function(req, res, next) {
    res.render('mgr/table_basic');
};

exports.biao2 = function(req, res, next) {
    res.render('mgr/table_data_tables');
};

exports.biao3 = function(req, res, next) {
    res.render('mgr/table_foo_table');
};

///////////////////xiangce
exports.xiang1 = function(req, res, next) {
    res.render('mgr/basic_gallery');
};

exports.xiang2 = function(req, res, next) {
    res.render('mgr/carousel');
};

exports.xiang3 = function(req, res, next) {
    res.render('mgr/layerphotos');
};

exports.xiang4 = function(req, res, next) {
    res.render('mgr/blueimp');
};
