var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://pedroalessandri:HFSqmrd1255@ds027318.mongolab.com:27318/pedrotest';//insecureª

module.exports = function (ctx, done) {



MongoClient.connect(url, function(err, db) {
  		assert.equal(null, err);
		var collection = db.collection('mails');
		collection.find().toArray(function (err, result) {
		  if (err) {
			console.log(err);
		  } else if (result.length) {
			done(null,result);
		  } else {
			console.log('No document(s) found with defined "find" criteria!');
		  }
		  //Close connection
		  db.close();
	});
})
};