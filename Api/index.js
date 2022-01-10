'use strict'

var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
var app = require('./app');
var port = process.env.PORT || 3977; 

const uri = "mongodb+srv://zarouAdm:q1w2e3r4@mylearningcluster.z5asf.mongodb.net/MusicApp";
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
        console.log('BBDD Connected!!!');
        app.listen(port, function(){
            console.log('Servidor del Api Rest de música escuchando en http://localhost:'+port);
        });
    }
});