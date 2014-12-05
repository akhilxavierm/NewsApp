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
    assert = require('assert');    BSON = require('mongodb').pure().BSON,


/* GET users listing. */
router.get('/', function(req, res) {


});

module.exports = router;
