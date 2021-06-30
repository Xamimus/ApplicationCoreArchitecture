var express = require('express');
var router = express.Router();

const {MongoClient} = require("mongodb");
const photo = process.argv[2];
const URI = "mongodb://localhost:27017/"

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

    router.post('/', (req, res, next) => {

      photos.insertOne({"name": "test"})
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))

      res.render('index', { title: 'Express', photos: photos });

    });

});


module.exports = router;
