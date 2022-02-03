"use strict";

const fs = require("fs");
const path = require("path");

const Album = require("../models/album");
const Song = require("../models/song");

function newAlbum(req, res) {
  var { artist, description, image, title, year } = req.body;

  var album = new Album({ title, description, year, image, artist });
  album.image = image ? image : null;

  album.save((err, albumStored) => {
    if (!err) {
      if (!albumStored) {
        res.status(404).send({ message: "Error registering album" });
      } else {
        res.status(200).send({ album: albumStored });
      }
    } else {
      res.status(500).send({ message: "Error saving album" });
    }
  });
}

function updateAlbumById(id, update, res) {
  Album.findByIdAndUpdate(id, update, (err, albumUpdate) => {
    if (!err) {
      if (albumUpdate) {
        res
          .status(200)
          .send({
            message: `The album '${albumUpdate.title}' has been updated successfully`,
          });
      } else {
        res.status(404).send({ message: "The album couldn`t be updated" });
      }
    } else {
      res.status(500).send({ message: "Error updating album" });
    }
  });
}

function updateAlbum(req, res) {
  var id = req.params.id;
  var update = req.body;

  updateAlbumById(id, update, res);
}

function deleteAlbum(req, res) {
  var id = req.params.id;

  Album.findByIdAndRemove(id, (err, albumRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error deleting album" });
    } else {
      if (!albumRemoved) {
        res.status(404).send({ message: "The album couldn`t be removed" });
      } else {
        deleteAlbumSongs(res, albumRemoved);
      }
    }
  });
}

function deleteAlbumSongs(res, album) {
  Song.find({ album: album?._id }).remove((err, songRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error removing song" });
    } else {
      if (!songRemoved) {
        res.status(404).send({ message: "The song couldn`t be removed" });
      } else {
        res
          .status(200)
          .send({
            message: `The album '${album.title}' has been deleted successfully`,
          });
      }
    }
  });
}

function getAlbum(req, res) {
  var id = req.params.id;

  Album.findById(id)
    .populate({ path: "artist" })
    .exec((err, album) => {
      if (!err) {
        if (!album) {
          res.status(404).send({ message: "Album doesn`t exist" });
        } else {
          res.status(200).send({ album });
        }
      } else {
        res.status(500).send({ message: "Error getting album" });
      }
    });
}

function solveAlbums(res, err, albums) {
  if (!err) {
    if (!albums) {
      res.status(404).send({ message: "Albums doesn`t exist" });
    } else {
      res.status(200).send({ albums });
    }
  } else {
    res.status(500).send({ message: "Error getting albums" });
  }
}

function getAlbums(req, res) {
  // console.log('getAlbums', req.params);
  var artistId = req.params.artist == "null" ? null : req.params.artist;
  var page = req.params.page ? req.params.page : 1;

  var options = {
    populate: "artist",
    page,
    limit: 3,
  };

  if (!artistId) {
    options.sort = { title: "asc" };
    Album.paginate({}, options, (err, albums) => solveAlbums(res, err, albums));
  } else {
    options.sort = { year: "asc" };
    Album.paginate({ artist: artistId }, options, (err, albums) =>
      solveAlbums(res, err, albums)
    );
  }
}

function uploadImg(req, res) {
  var id = req.params.id;

  if (req.file) {
    // console.log('req.file', req.file)
    var filePathSplit = req.file.path.split("/");
    var fileName = filePathSplit[filePathSplit.length - 1];
    var fileExt = req.file.mimetype.split("/")[1];

    if (!fileExt.match(/(jpg|jpeg|png|gif)/)) {
      res
        .status(400)
        .send({
          message:
            "Invalid extension. Allowed extensions: jpg, jpeg, png and gif",
        });
    } else if (req.file.size > 5000000) {
      res.status(400).send({ message: "Invalid size, It`s exceed 5Mb" });
    } else {
      var update = { image: fileName };
      updateAlbumById(id, update, res);
    }
  } else {
    res.status(404).send({ message: "The image couldn`t be upload" });
  }
}

function getImg(req, res) {
  var imageFile = req.params.imageFile;
  var pathFile = path.resolve(`uploads/albums/${imageFile}`);

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
  getAlbum,
  newAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImg,
  getImg,
};
