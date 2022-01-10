'use strict'

var mongoose = require('mongoose');
var monPaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

ArtistSchema.plugin(monPaginate);

module.exports = mongoose.model('Artist', ArtistSchema);