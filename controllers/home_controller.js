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