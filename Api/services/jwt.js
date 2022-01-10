'use strict'

var jwt = require('jsonwebtoken');
var secret = 'Prueba';

exports.createTocken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
    };

    return jwt.sign(payload, secret, { expiresIn: '24h' } )
};
