var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const database = "mongodb://root:12345@cluster0-shard-00-00-ecaim.mongodb.net:27017,cluster0-shard-00-01-ecaim.mongodb.net:27017,cluster0-shard-00-02-ecaim.mongodb.net:27017/Laravel-vue-song?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
var router = express.Router();


router.post('/add/issue',function(req,res){
    console.log("Post Issue");
    var title = req.body.title;
    var issueDesc = req.body.issueDesc;

    var myobj = { 
      "title": title, 
      "issue": issueDesc,
      "date": new Date(Date.now()).toISOString() 
    }; 
  
    MongoClient.connect(database, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mernapp"); 
        
      dbo.collection("post-issue").insertOne(myobj, function(err, response) {
        if (err) throw err;
    
        db.close();    
        res.json(myobj);  
        //res.json(response);        
      });    
    });
    
  });

  

  /* GET users listing. */
router.get('/lastTenIssue', function(req, res, next) {
  
  MongoClient.connect(database, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mernapp");
    var sort = { date: -1 };
    dbo.collection("post-issue").find({}).limit(10).sort(sort).skip(0).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });

});


  /* GET users listing. */
  router.get('/selected/:id', function(req, res, next) {
  var id = req.params.id;
  MongoClient.connect(database, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mernapp");
      var query = {"_id": new ObjectId(id)}
      dbo.collection("post-issue").find(query).limit(1).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    });

  });

module.exports = router;