'use strict';
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://MINTIC:grupo5@cluster0.tizvn.mongodb.net/BWN?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
