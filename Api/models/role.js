"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoleSchema = Schema(
  {
    name: String,
  },
  {
    versionKey: false, //Sólo utilizar si eliminas toda la colección de golpe, ya que es una propiedad para indexar documentos en la matriz
  }
);

module.exports = mongoose.model("Role", RoleSchema);
