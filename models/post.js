/**
 * Created by Jihann on 2015/11/2.
 * 文章模型
 */
var mongoose = require('mongoose');
var PostSchema = require('../schemas/post');
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
