var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');    BSON = require('mongodb').pure().BSON,


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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

var io = require('socket.io').listen(http.listen(3000));
io.sockets.on('connection', function (socket) {
    console.log("inside socket connection");
    var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

        console.log("inside socket connection setInterval");
        mongoclient.open(function(err, mongoclient) {

            var db = mongoclient.db("news_test");
            setInterval(function(){
                db.collection('mycollection').find().toArray(function(err,result){
                    console.log("result123--"+JSON.stringify(result[0]));
                    io.sockets.emit('chat message', result);

                });
            },10000);
        });
    mongoclient.close();




// Open the connection to the server

    socket.on('chat message', function (data) {
        console.log("this is data from client--"+data);
        io.sockets.emit('chat message', data);
    });
});


module.exports = app;
