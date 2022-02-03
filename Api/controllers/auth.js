"use strict";

var jwt = require("../services/jwt");

var User = require("../models/user");
var Gender = require("../models/gender");
var Role = require("../models/role");

function validSignUp(user) {
  return (
    (user.username != null) &
    (user.birthday != null) &
    (user.email != null) &
    (user.password != null)
  );
}

async function signUp(req, res) {
  try {
    var { birthday, email, gender, image, password, roles, username } =
      req.body;

    var newUser = new User({
      username,
      birthday,
      password: await User.encryptPassword(password),
      email: email.toLowerCase(),
      image: image ? image : null,
    });

    // Checkings fields
    if (validSignUp(newUser) & (gender != null)) {
      const foundGender = await Gender.findOne({ name: gender });
      newUser.gender = [foundGender._id];

      if (roles) {
        const foundRoles = await Role.find({
          name: { $in: roles.replace(/ /g, "").split(",") },
        });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "User" });
        newUser.roles = [role._id];
      }

      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();

      return res.status(200).json({ token: jwt.createTocken(savedUser) });
    } else {
      res.status(404).send({ message: "Incomplete request" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function signIn(req, res) {
  const { email, username, password } = req.body;

  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({
      $or: [{ username }, { email }],
    }).populate("roles gender");

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    return res
      .status(200)
      .json({ user: userFound, token: jwt.createTocken(userFound) });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = {
  signUp,
  signIn,
};
