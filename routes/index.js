var express = require('express');
var router = express.Router();
var fs=require('fs');
var path = require('path');
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
    assert = require('assert');



/* GET home page. */
router.get('/', function(req, res) {
    var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

// Open the connection to the server
    mongoclient.open(function(err, mongoclient) {
        var db = mongoclient.db("news_test");
        db.collection('mycollection').find().toArray(function(err,result){
            console.log("result123--"+JSON.stringify(result));
            res.render('index');
        });
    });

});

module.exports = router;
