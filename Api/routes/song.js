'use strict'

const express = require('express');
const multer = require('multer');

const SongController = require('../controllers/song');

// Set Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/songs')
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
api.get('/:id', md_auth.ensureAuth, SongController.getSong);
api.post('/new', md_auth.ensureAuth, SongController.newSong);
// Mirar con más profundidad el paso de parámetros. Si se pasa a vacío no entra. ***Se puede pasar un Json***
api.get('/songs/:album?/:page?', md_auth.ensureAuth, SongController.getSongs);
api.put('/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file/:id', [upload.single('file'), md_auth.ensureAuth], SongController.uploadFile);
api.get('/get-file/:songFile', SongController.getFile);



module.exports = api;