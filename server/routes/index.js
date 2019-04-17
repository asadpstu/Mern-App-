var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api Service',details: 'MERN Application Backend service(Node-Express) is here.' });
});

module.exports = router;
