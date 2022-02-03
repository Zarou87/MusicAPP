"use strict";

var mongoose = require("mongoose");
var config = require("./conf");
// var MongoClient = require('mongodb').MongoClient;
var app = require("./app");
var port = process.env.PORT || 3977;

const uri = config.URI_DATABASE;
// const client = new MongoClient(uri, { useNewUrlParser: true });

// mongoose.connect('', (err, res) => {
//    if (err) {
//        throw err;
//    } else {
//        console.log('BBDD Connected!!!')
//    }

// });

mongoose.connect(uri, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("BBDD Connected!!!");
    app.listen(port, function () {
      console.log(
        "Servidor del Api Rest de música escuchando en http://localhost:" + port
      );
    });
  }
});
