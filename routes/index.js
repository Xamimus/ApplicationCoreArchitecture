var express = require('express');
var multer = require("multer");
var router = express.Router();

const {MongoClient} = require("mongodb");
const URI = "mongodb://localhost:27017/"

// Configuration dossier d'upload + nom des fichiers
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
});
var upload = multer({ storage: storage });

// Fonction pour rendre l'ordre des objects d'un array aléatorie
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Connexion à la base Mongo
MongoClient.connect(
  URI,
  {
    useUnifiedTopology: true,
  },
)
  .then(client => {

    // Récupération de la collection photo
    const photos = client.db('carrousel').collection('photo');

    // Route principale qui affiche le carrousel avec 5 photos choisies aléatoirement et le champ d'upload
    router.get('/', function(req, res, next) {
      photos.find().toArray((err, items) => {
        res.render('index', { title: 'Carrousel, par CLAVIER Eliott, MARTIN Maxime, CHABIN Florent et PIGNON Nathan', photos: shuffle(items).slice(0,5) });
      });
    });

    // Route qui redirige vers la route principale après l'upload en POST
    router.get('/upload', (req, res, next) => {
      res.redirect('/');
    });

    // Route qui ajoute l'image dans public/upload et un objet avec le lien vers la photo en base
    router.post('/upload', upload.single('image'), (req, res, next) => {
      photos.insertOne({"image": req.file.originalname})
        .then(result => true)
        .catch(error => console.error(error))
      res.redirect('/');
    });
});


module.exports = router;
