"use strict";

const Role = require("../models/role");
const Gender = require("../models/gender");

const ROLES = ["User", "Admin", "Moderator"];
const GENDERS = ["Hombre", "Mujer", "No binario"];

async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "User" }).save(),
      new Role({ name: "Moderator" }).save(),
      new Role({ name: "Admin" }).save(),
    ]);
  } catch (err) {
    console.log("error", err);
  }
}

async function createGenders() {
  try {
    const count = await Gender.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Gender({ name: "Hombre" }).save(),
      new Gender({ name: "Mujer" }).save(),
      new Gender({ name: "No binario" }).save(),
    ]);
  } catch (err) {
    console.log("error", err);
  }
}

module.exports = {
  createRoles,
  createGenders,
  ROLES,
  GENDERS,
};
