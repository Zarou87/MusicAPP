"use strict";

const jwt = require("jsonwebtoken");
const config = require("./../conf");

const User = require("../models/user");
const Role = require("../models/role");

function ensureAuth(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "No token provided" });

  // console.log("Header", req.headers);
  // Limpiar el Token
  // var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    var payload = jwt.verify(token, config.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    // console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send({ message: "Token expired" });
    } else {
      res.status(403).send({ message: "Unauthorized!" });
    }
  }
}

async function isModerator(req, res, next) {
  try {
    // const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: req.user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

async function isAdmin(req, res, next) {
  try {
    // No me hace falta ya que genero el Token con todo el usuario
    // const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: req.user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

module.exports = {
  ensureAuth,
  isModerator,
  isAdmin,
};
