var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://pedroalessandri:HFSqmrd1255@ds027318.mongolab.com:27318/pedrotest';//insecureª
var actualDate = new Date();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

module.exports = function (ctx, done) {

var insertDocument = function(db, callback) {
   db.collection('mails').insertOne( {
      "email" : {
         "date" : mm+'/'+dd+'/'+yyyy,
		 "hour": today.getHours(),
         "subject" : ctx.data.subject,
		 "sender" : ctx.data.sender,
      }
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
};