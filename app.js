/* 模块依赖 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//把session会话状态信息保存在mongodb中
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//导入mongoose
var mongoose = require('mongoose');
//导入配置项
var setting = require('./config/setting');

//导入路由
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//连接mongodb
mongoose.connect(setting.dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//默认extended为false，那么在后台获取表单对象时，获取不到值
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//配置session
app.use(session({
  secret: 'chujue',
  store: new MongoStore({
    url: setting.dbUrl,
    collection: 'sessions'
  })
}));
//静态资源例如js，css统一从public文件下查找
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
