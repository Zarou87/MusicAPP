"use strict";

var express = require("express");
var multer = require("multer");
var UserController = require("../controllers/user");

var api = express.Router();

// Set Multer Storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Middlewares
var md_auth = require("../middlewares/authenticated");
var upload = multer({ storage });

// Routes
// El id sería opcional ya que lo tenemos en el token, pero nos sirve para hacer pruebas con otros usuarios
api.put("/:id", md_auth.ensureAuth, UserController.updateUser);
api.delete(
  "/:id",
  [md_auth.ensureAuth, md_auth.isAdmin],
  UserController.deleteUser
);
api.post(
  "/upload-img/:id",
  [upload.single("file"), md_auth.ensureAuth],
  UserController.uploadImg
);
api.get("/get-image-user/:imageFile", UserController.getImg);

module.exports = api;
