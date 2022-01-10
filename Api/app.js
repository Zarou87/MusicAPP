'use strict'

const express = require('express');
const cors = require('cors');

var app = express();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    methods: ['GET','POST','OPTIONS','PUT','DELETE']
}

// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// configurar cabeceras http - para el COSR
app.use(cors(corsOptions));

// rutas base
app.use('/api', user_routes);
app.use('/api/artist', artist_routes);
app.use('/api/album', album_routes);
app.use('/api/song', song_routes);

module.exports = app;

