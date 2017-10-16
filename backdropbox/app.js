var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var login = require('./routes/login_register');
var upload = require('./routes/upload');
var files = require('./routes/files');

var app = express();

//Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : "CMPE273LAB1",
    resave : true,
    saveUninitialized : false,
    cookie: {
        secure: true,
        expires: 600000
    }
}));

//app.use('/', index);
//app.use('/users', users);

app.post('/signin',login.doLogin);
app.post('/signup',login.doSignup);
app.use('/upload',upload);
app.post('/getFiles',files.getFiles);
app.post('/dlFile',files.dlFile);
app.post('/deleteFile',files.deleteFile);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
