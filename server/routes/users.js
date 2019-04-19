var express = require('express');

var MongoClient = require('mongodb').MongoClient;

const database = "mongodb://root:12345@cluster0-shard-00-00-ecaim.mongodb.net:27017,cluster0-shard-00-01-ecaim.mongodb.net:27017,cluster0-shard-00-02-ecaim.mongodb.net:27017/Laravel-vue-song?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";


var router = express.Router();

/* GET users listing. */
router.get('/all-Post', function(req, res, next) {
  
  MongoClient.connect(database, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mernapp");
    var sort = { date: -1 };
    dbo.collection("post").find({}).limit(5).sort(sort).skip(0).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });

});



router.post('/insert',function(req,res){
  console.log("Post data");
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var myobj = { 
    "firstname": firstname, 
    "lastname": lastname,
    "username": username, 
    "city": city, 
    "state": state,
    "zip": zip,
    "date": new Date(Date.now()).toISOString() 
  }; 

  MongoClient.connect(database, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mernapp"); 
      
    dbo.collection("post").insertOne(myobj, function(err, response) {
      if (err) throw err;
  
      db.close();    
      res.json(myobj);  
      //res.json(response);        
    });    
  });
  
});



router.post('/update',function(req,res){
  var id = req.body._id;
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  



  MongoClient.connect(database, function(err, db) {

    if (err) throw err;
    var dbo = db.db("mernapp");
    var myquery = { "username": username };
    var newvalues = { $set: {"firstname" : firstname, "lastname": lastname, "city":city, "state":state, "zip":zip } };
    dbo.collection("post").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    db.close();
    });
    
  });
  res.json(req.body);

 
});

module.exports = router;
