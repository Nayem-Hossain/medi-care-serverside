const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

/*
user:nayem
password:nayemDBuser

user:admin
pass:adminPetsParadiseDB
*/

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@freecluster.bcmfb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log(uri);


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/* client.connect((err) => {
  const collection = client.db("medicareDatabase").collection("blogs");
  // perform actions on the collection object
  console.log("hitting the database");
  const userComment = { comment: "thanks" };
  collection.insertOne(userComment).then(() => {
    console.log("inserttion successful");
  });
  // client.close();
}); */

async function run() {
  try {
    await client.connect();
    const database = client.db("medicareDatabase");
    const userCollection = database.collection("blogs");
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    };
    const result = await userCollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to MediCare Server");
});

app.listen(port, () => {
  console.log(`MediCare Server listening at http://localhost:${port}`);
});
