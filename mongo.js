const {MongoClient} = require("mongodb");

const photo = process.argv[2];

const URI = "mongodb://localhost:27017/"

MongoClient.connect(
  URI,
  {
    useUnifiedTopology: true,
  },
  connected
);
function connected(err,client){
  if(err) throw err;
  const photos = client.db("carrousel").collection("photo");
  if (photo){
    addPhoto(client, photos);
  }
  else{
    addPhoto(client, photos);
  }
}
function addPhoto(client,photo){
  photo.insertOne(
    {
      photo: photo,
    },
    (err)=>{
      if (err) throw err;
      console.log("Nouvelle Photo: ", photo);
      listPhotos(client , photo);
    }
  );
}
function listPhotos(client, photo){
  photo.find().each((err,doc)=>{
    if (err) throw err;
    if (!doc){
      client.close();
      return;
    }
    console.log(doc);
  });
}
