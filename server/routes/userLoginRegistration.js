var express = require('express');
const bcrypt = require('bcrypt');
var mysql = require('mysql');

var router = express.Router();

//connecting Mysql database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mernapp"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Mysql database!");
  });


router.post('/create-account',function(req,res){
    
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var encrypt = bcrypt.hashSync(password, 10);
    //var dycrypt = bcrypt.compareSync('12345', encrypt); 

        var sql = "INSERT INTO mernappuser (first_name, last_name, email, password) VALUES ('"+first_name+"', '"+last_name+"','"+email+"','"+encrypt+"')";
        con.query(sql, function (err, result) {
          if(err)
          {
            res.json({
               "result" : "FALSE"
            });
          }
          else
          {
            res.json({
               "result" : "TRUE"
            });
          }
          
        });

    
});


router.post('/login',function(req,res){
    
    var email = req.body.email;
    var password = req.body.password;

    con.query("SELECT * FROM mernappuser WHERE email = '"+email+"' LIMIT 1 ", function (err, result) {
          if (err) 
          {
            res.json({"result":"FALSE"});
          }
          else
          {
            if(result.length >= 1 )
            {
             var retrievePass =  result[0].password;
             var dycrypt = bcrypt.compareSync(password, retrievePass); 
             if(dycrypt == true)
              {
                res.json({"result":"TRUE"}); 
              }
             else
              {
                res.json({"result":"FALSE"}); 
              } 
                            
            } 
            else
            {
                res.json({"result":"FALSE"});      
            } 

           
          }

    });


    
});

module.exports = router;