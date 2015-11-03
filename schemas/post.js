/**
 * Created by Jihann on 2015/11/2.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title : String,
    poster : String,
    content : String,
    pv : {
        type : Number,
        default : 0
    },
    meta : {
        createdAt : {
            type : Date,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            default : Date.now()
        }
    }
});

PostSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updatedAt = Date.now();
    }
    next();
});

PostSchema.statics = {
    fetch : function(cb) {
        return this
            .find({})
            .sort('meta.updatedAt')
            .exec(cb);
    },
    findById : function(id, cb) {
        return this
            .findOne({_id : id})
            .exec(cb);
    }
};

module.exports = PostSchema;