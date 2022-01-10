'use strict'

var bcrypt = require('bcryptjs');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');

var jwt = require('../services/jwt')

function pruebas(req, res) {
    res.status(200).send({ message: 'Probando una acción del controlador de usuarios'});
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = null;

    if (params.password) {
        bcrypt.hash(params.password, 8, function(err, hash) {
            user.password = hash;
            if (!err & user.name != null & user.surname != null & user.email != null) {
                user.save((err,userStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error al guardar el Usuario'});
                    } else {
                        if (!userStored) {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            } else {
                res.status(200).send({message: 'Rellene todos los campos'});
            }
        });
    } else {
        res.status(404).send({message: 'Introduce la contraseña'});
    }
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase()}, (err,user) => {
        if (err) {
            res.status(500).send({message: 'Request Error'});
        } else {
            if (!user) {
                res.status(404).send({message: 'User not found'});
            } else {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.getHash) {
                            // Devolver Token
                            res.status(200).send({ token: jwt.createTocken(user) }); 
                        } else {
                            res.status(200).send({ user }); 
                        }
                    } else {
                        res.status(404).send({message: 'The login couldn`t be completed'});
                    }
                });
            }
        }
    });
}

function updateUserById(id, update, res) {
    User.findByIdAndUpdate(id, update, (err,userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error updating user'});
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'The user couldn`t be updated'});
            } else {
                res.status(200).send({ user: userUpdated});
            }
        }
    });
}

function updateUser(req, res) {
    var id = req.params.id;
    var update = req.body;
    
    updateUserById(id, update, res); 
}

function uploadImg(req, res) {
    var id = req.params.id;

    if (req.file) {
        // console.log('file', req.file);
        var filePathSplit = req.file.path.split('/');
        var fileName = filePathSplit[filePathSplit.length -1];
        var fileExt = req.file.mimetype.split('/')[1];

        if (!fileExt.match(/(jpg|jpeg|png|gif)/)) {
            res.status(400).send({ message: 'Invalid extension. Allowed extensions: jpg, jpeg, png and gif'}); 
        }else if (req.file.size > 5000000) {
            res.status(400).send({ message: 'Invalid size, It`s exceed 5Mb'}); 
        } else {
            var update = { image: fileName };
            updateUserById(id,update, res);
        }
    } else {
        res.status(404).send({ message: 'The image couldn`t be upload'});
    }

}

function getImg(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = path.resolve(`uploads/users/${imageFile}`);

    try {
        fs.statSync(pathFile);
        res.sendFile(pathFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.status(200).send({ message: 'The file doesn`t exist'})
        }
    }
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImg,
    getImg
};