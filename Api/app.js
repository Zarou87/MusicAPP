"use strict";

const libs = require("./libs/initialSetup");

const express = require("express");
const cors = require("cors");

var app = express();
libs.createRoles();
libs.createGenders();

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};

// Cargar rutas
var auth_routes = require("./routes/auth");
var user_routes = require("./routes/user");
var artist_routes = require("./routes/artist");
var album_routes = require("./routes/album");
var song_routes = require("./routes/song");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// configurar cabeceras http - para el COSR
app.use(cors(corsOptions));

// rutas base
app.use("/api/auth", auth_routes);
app.use("/api/user", user_routes);
app.use("/api/artist", artist_routes);
app.use("/api/album", album_routes);
app.use("/api/song", song_routes);

module.exports = app;
