'use strict'

const express = require('express');
const multer = require('multer');

const AlbumController = require('../controllers/album');

// Set Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/albums')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

// Middlewares
const md_auth = require('../middlewares/authenticated');
var upload = multer( { storage } );

const api = express.Router();

// Routes
api.get('/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/new', md_auth.ensureAuth, AlbumController.newAlbum);
// Mirar con más profundidad el paso de parámetros. Si se pasa a vacío no entra. ***Se puede pasar un Json***
api.get('/albums/:artist?/:page?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/upload-img/:id', [upload.single('file'), md_auth.ensureAuth], AlbumController.uploadImg);
api.get('/get-img/:imageFile', AlbumController.getImg);



module.exports = api;