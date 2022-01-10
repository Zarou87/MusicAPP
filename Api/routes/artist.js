'use strict'

const express = require('express');
const multer = require('multer');

const ArtistController = require('../controllers/artist');

// Set Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/artists')
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
api.get('/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/new', md_auth.ensureAuth, ArtistController.newArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-img/:id', [upload.single('file'), md_auth.ensureAuth], ArtistController.uploadImg);
api.get('/get-img/:imageFile', ArtistController.getImg);


module.exports = api;