"use strict";

const express = require("express");

const AuthController = require("../controllers/auth");

// Middlewares
const md_SignUp = require("../middlewares/verifySignUp");

const api = express.Router();

// Routes
api.post(
  "/sign-up",
  [
    md_SignUp.checkDuplicateUsernameOrEmail,
    md_SignUp.checkRolesExisted,
    md_SignUp.checkGenderExisted,
  ],
  AuthController.signUp
);
api.post("/sign-in", AuthController.signIn);

module.exports = api;
