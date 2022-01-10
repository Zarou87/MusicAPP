'use strict'

var mongoose = require('mongoose');
var monPaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration: Number,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album' }
});

SongSchema.plugin(monPaginate);

module.exports = mongoose.model('Song', SongSchema);