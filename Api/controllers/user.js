"use strict";

var fs = require("fs");
var path = require("path");

var User = require("../models/user");
var Role = require("../models/role");
var Gender = require("../models/gender");

function updateUserById(id, update, res) {
  User.findByIdAndUpdate(id, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      if (!userUpdated) {
        res.status(404).send({ message: "The user couldn`t be updated" });
      } else {
        res.status(204).send();
      }
    }
  });
}

async function updateUser(req, res) {
  // Update Roles
  if (req.body.roles) {
    req.body.roles = await Role.find({
      name: { $in: req.body.roles.replace(/ /g, "").split(",") },
    });
  }

  // Update Gender
  if (req.body.gender) {
    req.body.gender = await Gender.findOne({ name: req.body.gender });
  }

  updateUserById(req.params.id, req.body, res);
}

function deleteUser(req, res) {
  var id = req.params.id;

  User.findByIdAndRemove(id, (err, userRemoved) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      if (!userRemoved) {
        res.status(404).send({ message: "The user couldn`t be removed" });
      } else {
        res.status(204).send();
      }
    }
  });
}

function uploadImg(req, res) {
  var id = req.params.id;

  if (req.file) {
    // console.log('file', req.file);
    var filePathSplit = req.file.path.split("/");
    var fileName = filePathSplit[filePathSplit.length - 1];
    var fileExt = req.file.mimetype.split("/")[1];

    if (!fileExt.match(/(jpg|jpeg|png|gif)/)) {
      res.status(400).send({
        message:
          "Invalid extension. Allowed extensions: jpg, jpeg, png and gif",
      });
    } else if (req.file.size > 5000000) {
      res.status(400).send({ message: "Invalid size, It`s exceed 5Mb" });
    } else {
      var update = { image: fileName };
      updateUserById(id, update, res);
    }
  } else {
    res.status(404).send({ message: "The image couldn`t be upload" });
  }
}

function getImg(req, res) {
  var imageFile = req.params.imageFile;
  var pathFile = path.resolve(`uploads/users/${imageFile}`);

  try {
    fs.statSync(pathFile);
    res.sendFile(pathFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(200).send({ message: "The file doesn`t exist" });
    }
  }
}

module.exports = {
  updateUser,
  deleteUser,
  uploadImg,
  getImg,
};
