'use strict'

var jwt = require('jsonwebtoken');
var secret = 'Prueba';

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        res.status(403).send({ message: 'Request haven`t authorization header'} );
    }
    // console.log("Header", req.headers);
    // Limpiar el Token
    // var token = req.headers.authorization.replace(/['"]+/g, '');
    var token = req.headers.authorization;

    try {
        var payload = jwt.verify(token, secret);
        req.user = payload;    
        next();
    } catch (err) {
        // console.log(err);
        if ( err instanceof jwt.TokenExpiredError ) {
            res.status(401).send({ message: 'Token expired'});
        } else {
            res.status(404).send({ message: 'Invalid token'});
        }
    }
}