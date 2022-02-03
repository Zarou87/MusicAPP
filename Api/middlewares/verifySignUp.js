"use strict";

const User = require("../models/user");
const libs = require("../libs/initialSetup");

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The user already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    const roles = req.body.roles.split(",");
    for (let i = 0; i < roles.length; i++) {
      if (!libs.ROLES.includes(roles[i].trim())) {
        return res.status(400).json({
          message: `Role '${roles[i]}' does not exist`,
        });
      }
    }
  }

  next();
}

function checkGenderExisted(req, res, next) {
  if (req.body.gender) {
    const gender = req.body.gender.trim();
    if (!libs.GENDERS.includes(gender)) {
      return res.status(400).json({
        message: `Gender '${gender}' does not exist`,
      });
    }
  }

  next();
}

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkGenderExisted,
};
