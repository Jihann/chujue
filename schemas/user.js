/**
 * Created by Jihann on 2015/11/1.
 * 用户中心Schema
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username : {
        unique : true,
        type : String
    },
    // 0: nomal user
    // 1: verified user
    // 2: professonal user
    // >10: admin
    // >50: super admin
    role : {
        type : Number,
        default : 0
    },
    password : String,
    meta : {
        createdAt : {
            type : Date,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            default : Date.now()
        }
    },
    sex : {
        type : String,
        default : 'boy'
    },
    loginIP : String,
    email : String
});

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updatedAt = Date.now();
    }
    next();
});

UserSchema.statics = {
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

module.exports = UserSchema;