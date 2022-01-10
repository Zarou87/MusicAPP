'use strict'

const fs = require('fs');
const path = require('path');

const Song = require('../models/song');

function newSong(req, res) {
    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, songStored) => {
        if (!err) {
            if (!songStored) {
                res.status(404).send( { message: 'Error registering song' } );
            } else {
                res.status(200).send( { song: songStored } );
            }
        } else {
            res.status(500).send( { message: 'Error saving song' } );
        }
    });
}

function updateSongById(id, update, res) {
    Song.findByIdAndUpdate(id, update, (err, songUpdate) => {
        if (!err) {
            if (songUpdate) {
                res.status(200).send({ message: `The song '${songUpdate.name}' has been updated successfully` });
            } else {
                res.status(404).send({ message: 'The song couldn`t be updated' });
            }
        } else {
            res.status(500).send({ message: 'Error updating song' });
        }
    });
}

function updateSong(req, res) {
    var id = req.params.id;
    var update = req.body;

    updateSongById(id, update, res);
}

function deleteSong(req, res) {
    var id = req.params.id;

    Song.findByIdAndRemove(id, (err, songRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting song' });
        } else {
            if (!songRemoved) {
                res.status(404).send({ message: 'The song couldn`t be removed'});
            } else {
                res.status(200).send({ message: `The song '${songRemoved.name}' has been deleted successfully` });
            }
        }
    });
}

function getSong(req, res) {
    var id = req.params.id;

    Song.findById(id).populate({ 
        path: 'album', 
        populate: { 
            path: 'artist', 
            model: 'Artist'
        }
    }).exec((err, song) => {
        if (!err) {
            if (!song) {
                res.status(404).send( { message: 'Song doesn`t exist' } );
            } else {
                res.status(200).send( { song } );
            }
        } else {
            res.status(500).send( { message: 'Error getting song' } );
        }
    });
};

function solveSong(res, err, song) {
    if (!err) {
        if (!song) {
            res.status(404).send( { message: 'Song doesn`t exist' } );
        } else {
            res.status(200).send( { song } );
        }
    } else {
        res.status(500).send( { message: 'Error getting song' } );
    }
}

function getSongs(req, res) {
    // console.log('getSongs', req.params);
    var albumId = req.params.album == 'null' ? null : req.params.album;
    var page = req.params.page ? req.params.page : 1;

    var options = {
        populate: 'album',
        page,
        limit: 3
    }

    if (!albumId) {
        options.sort = { title: 'asc'};
        Song.paginate({}, options, (err, songs) => solveSong(res, err, songs));
    } else {
        options.sort = { year: 'asc'};
        Song.paginate({ album: albumId }, options, (err, songs) => solveSong(res, err, songs));
    }
}

function uploadFile(req, res) {
    var id = req.params.id;

    if (req.file) {
        // console.log('req.file', req.file)
        var filePathSplit = req.file.path.split('/');
        var fileName = filePathSplit[filePathSplit.length -1];
        var fileExt = req.file.mimetype.split('/')[1];

        if (!fileExt.match(/(mp3|ogg)/)) {
            res.status(400).send({ message: 'Invalid extension. Allowed extensions: jpg, jpeg, png and gif'}); 
        }else if (req.file.size > 5000000) {
            res.status(400).send({ message: 'Invalid size, It`s exceed 5Mb'}); 
        } else {
            var update = { file: fileName };
            updateSongById(id, update, res);
        }
    } else {
        res.status(404).send({ message: 'The file couldn`t be upload'});
    }

}

function getFile(req, res) {
    var songFile = req.params.songFile;
    var pathFile = path.resolve(`uploads/songs/${songFile}`);

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
    getSong,
    newSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getFile
}