var express = require('express');
var multer = require("multer");
var router = express.Router();

const {MongoClient} = require("mongodb");
const URI = "mongodb://localhost:27017/"

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
});
var upload = multer({ storage: storage });

MongoClient.connect(
  URI,
  {
    useUnifiedTopology: true,
  },
)
  .then(client => {

    const photos = client.db('carrousel').collection('photo');

    router.get('/', function(req, res, next) {
      photos.find().toArray((err, items) => {
        res.render('index', { title: 'Express', photos: items });
      })
    });

    router.get('/upload', (req, res, next) => {
      res.redirect('/');
    })

    router.post('/upload', upload.single('image'), (req, res, next) => {
      photos.insertOne({"image": req.file.originalname})
        .then(result => {
          return true;
        })
        .catch(error => console.error(error))
      res.redirect('/');
    });

});


module.exports = router;
