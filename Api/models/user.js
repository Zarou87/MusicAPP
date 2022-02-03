"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var UserSchema = Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    gender: { type: Schema.ObjectId, ref: "Gender" },
    birthday: Date,
    password: String,
    roles: [{ type: Schema.ObjectId, ref: "Role" }],
    image: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = mongoose.model("User", UserSchema);
