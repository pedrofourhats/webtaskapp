var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://pedroalessandri:HFSqmrd1255@ds027318.mongolab.com:27318/pedrotest';//insecureª

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
	var collection = db.collection('mails');
	var distincts = collection.distinct('email.sender');
	var groupBy = collection.group(
	   {
		 key: { '_id':'1'},
	   }
	);
	
	collection.aggregate([
    { $unwind: '$email' },
    { $project: { sender: { $sender: '$email.sender' } } },
    { $group: { _id: { sender: '$sender' }, count: { $sum: 1 } } }
	]);

	console.log(groupBy);
	  db.close();
	});



