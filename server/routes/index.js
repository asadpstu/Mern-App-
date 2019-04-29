var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs');
var dir = require('node-dir');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api Service',details: 'MERN Application Backend service(Node-Express) is here.' });
});

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

router.use(fileUpload())


router.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/../uploads/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `uploads/${req.files.file.name}`,
      })
    }
  )
})

router.get('/upload', (req, res, next) => {
  fs.readdir('./uploads', function (err, files) {
    if(err)
    {
      console.log(err);
    }
    else
    {
      var total = files.length;
      var location = "localhost:3000/uploads/"
      res.json({"total" : total,"location" : location,"imagelist" : files});
    }

});

})

router.get('/location', function(req, res, next) {
  let locationdata = fs.readFileSync('location.json');  
  let location = JSON.parse(locationdata);
  res.json({
    location
  });
});



module.exports = router;
