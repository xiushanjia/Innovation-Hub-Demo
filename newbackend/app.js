var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require("mongodb").MongoClient;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { time } = require('console');
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/lib", express.static(path.join(__dirname, 'node_modules')));
app.use('/', indexRouter);
app.use('/testroute', usersRouter);
app.use('/api', usersRouter);
app.post('/api', (req, res) => {
  var url = "mongodb://localhost:27017/TestUser";
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log("数据库连接失败");
      return;
    }
    console.log("数据库连接成功");
    var db = client.db("TestUser");
    db.collection("user").insertOne({
      "username": req.body.userName,
      "password": req.body.password,
      "company": 'ava',
    }, function (err, result) {
      if (err) {
        res.send("插入数据失败");
        return;
      }
      console.log(result);
      client.close();
      res.end();
    })
  });
  console.log(req.body);
  res.send('Back End Test Successful');
});

const server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log("访问接口：http://%s%s", host, port)

})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//main app
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
