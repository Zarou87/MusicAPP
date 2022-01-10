'use strict'

var express = require('express');
var multer = require('multer');
var UserController = require('../controllers/user');

var api = express.Router();

// Set Multer Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

// Middlewares
var md_auth = require('../middlewares/authenticated');
var upload = multer( { storage } );

// Routes
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
// El id sería opcional ya que lo tenemos en el token, pero nos sirve para hacer pruebas con otros usuarios
api.put('/update-user/:id',  md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [upload.single('file'), md_auth.ensureAuth], UserController.uploadImg);
api.get('/get-image-user/:imageFile', UserController.getImg);

module.exports = api;