'use strict'

const fs = require('fs');
const path = require('path');

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

function newArtist(req, res) {
    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = null;

    artist.save((err, artistStored) => {
        if (!err) {
            if (!artistStored) {
                res.status(404).send( { message: 'Error registering artist' } );
            } else {
                res.status(200).send( { artist: artistStored } );
            }
        } else {
            res.status(500).send( { message: 'Error saving artist' } );
        }
    });
}

function updateArtistById(id, update, res) {
    Artist.findByIdAndUpdate(id, update, (err, artistUpdate) => {
        if (!err) {
            if (artistUpdate) {
                res.status(200).send({ message: `The artist '${artistUpdate.name}' has been updated successfully` });
            } else {
                res.status(404).send({ message: 'The artist couldn`t be updated' });
            }
        } else {
            res.status(500).send({ message: 'Error updating artist' });
        }
    });
}

function updateArtist(req, res) {
    var id = req.params.id;
    var update = req.body;

    updateArtistById(id, update, res);
}

function deleteArtist(req, res) {
    var id = req.params.id;
    
    Artist.findByIdAndRemove(id, (err, artistRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error removing artist'});
        } else {
            if (!artistRemoved) {
                res.status(404).send({ message: 'The artist couldn`t be removed'});
            } else {
                deleteArtistAlbums(res, artistRemoved);
            }
        }
    });
}

function deleteArtistAlbums(res, artist) {
    Album.find({ artist: artist._id }).remove((err, albumRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error removing album'});
        } else {
            if (!albumRemoved) {
                res.status(404).send({ message: 'The album couldn`t be removed'});
            } else {
                deleteArtistSongs(res, artist, albumRemoved);
            }
        }
    });
}

// El borrado a tercer nivel no funciona
function deleteArtistSongs(res, artist, album) {
    console.log('deleteArtistSongs album', album);
    Song.find({ album: album._id }).remove((err, songRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error removing song'});
        } else {
            if (!songRemoved) {
                res.status(404).send({ message: 'The song couldn`t be removed'});
            } else {
                res.status(200).send({ message: `The artist '${artist.name}' has been deleted successfully` });
            }
        }
    });
}

function getArtist(req, res) {
    var id = req.params.id;

    Artist.findById(id, (err, artist) => {
        if (!err) {
            if (!artist) {
                res.status(404).send( { message: 'Artist doesn`t exist' } );
            } else {
                res.status(200).send( { artist } );
            }
        } else {
            res.status(500).send( { message: 'Error getting artist' } );
        }
    });
}

function getArtists(req, res) {
    var page = req.params.page ? req.params.page : 1;
    var itemsPerPage = req.params.items ? eq.params.items : 3;

    var options = {
        page,
        limit: itemsPerPage,
        sort: { name: 'asc' }
    }

    Artist.paginate({}, options, (err, result) => {
        if (!err) {
            if (!result) {
                res.status(404).send( { message: 'Artist doesn`t exist' } );
            } else {
                res.status(200).send( { result } );
            }
        } else {
            res.status(500).send( { message: 'Error getting artist' } );
        }
    });
    
}

function uploadImg(req, res) {
    var id = req.params.id;

    if (req.file) {
        console.log('req.file', req.file)
        var filePathSplit = req.file.path.split('/');
        var fileName = filePathSplit[filePathSplit.length -1];
        var fileExt = req.file.mimetype.split('/')[1];

        if (!fileExt.match(/(jpg|jpeg|png|gif)/)) {
            res.status(400).send({ message: 'Invalid extension. Allowed extensions: jpg, jpeg, png and gif'}); 
        }else if (req.file.size > 5000000) {
            res.status(400).send({ message: 'Invalid size, It`s exceed 5Mb'}); 
        } else {
            var update = { image: fileName };
            updateArtistById(id, update, res);
        }
    } else {
        res.status(404).send({ message: 'The image couldn`t be upload'});
    }

}

function getImg(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = path.resolve(`uploads/artists/${imageFile}`);

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
    getArtist,
    newArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImg,
    getImg
}