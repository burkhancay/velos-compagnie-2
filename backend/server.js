const PORT = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = express.Router();
app.use("/api", routes);
 
// body-parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
const jsonParser = bodyParser.json();
 
//cors
routes.use(cors());
 
// mongoDB client
const MongoClient = require("mongodb").MongoClient;
const uri =
"mongodb+srv://burkhan:velos@cluster-velos.kntz4.mongodb.net/velos?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DATABASE = "velos";
 
// connect to server
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`);
});
 
// connect to DB
client.connect((err) => {
  if (err) {
    throw Error(err);
  }
  
  !err && console.log(`Successfully connected to database`);
  const products = client.db(DATABASE).collection("products");
  const users = client.db(DATABASE).collection("users");

  // perform actions on the collection object
  
  // GET

  routes.get("/products", function (req, res) {
    products.find().toArray().then((error, results) => {
        if(error){ return res.send(error) }
        res.status(200).send({ results });
    })
    .catch((err) => res.send(err));
  });

  routes.get("/user", function (req, res){
    users.findOne(req.body)
    .then((error, results) => {
      if(error){ return res.send(error) }
      return res.status(200).send(results.data);
    }).catch(err => res.send(err))
  })

  // POST


  routes.post("/products/add", jsonParser, function (req, res) {
      products.insertOne(req.body)
      .then(() => res.status(200)
      .send("successfully inserted new document")
      )
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  });
  routes.post("/users/add", jsonParser, function (req, res){
    users
    .insertOne(req.body)
    .then(() => res.status(200)
    .send("successfully inserted new document")
      )
    .catch(err => {
        console.log(err);
        res.send(err);
      });
  })
});

 
//routes
routes.get("/", (req, res) => {
  res.send("Hello World!");
});
 
