'use strict'

var mongoose = require('mongoose');
var monPaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});

AlbumSchema.plugin(monPaginate);

module.exports = mongoose.model('Album', AlbumSchema);