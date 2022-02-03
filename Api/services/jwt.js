"use strict";

var jwt = require("jsonwebtoken");
var config = require("./../conf");

exports.createTocken = function (user) {
  var payload = {
    sub: user._id,
    username: user.username,
    gender: user.gender,
    birthday: user.birthday,
    email: user.email,
    roles: user.roles,
    image: user.image,
  };
  console.log("payload", payload);

  return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: "24h" });
};
