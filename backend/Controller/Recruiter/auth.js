// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const HttpError = require("../../Models/http-Error");
const Recruiter = require("../../Models/recruiter/auth");
const RecruiterProfile = require('../../Models/recruiter/recruiterProfile');

const signup = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return next(
  //       new HttpError("Invalid inputs passed, please check your data.", 422)
  //     );
  //   }
  console.log("signup");

  const { firstName, secondName, emailormobile, password } = req.body;

  let existingUser;
  try {
    existingUser = await Recruiter.findOne({ emailormobile: emailormobile });
  } catch (err) {
    const error = new Error(
      "Signing up failed, please try again later1."
    );
    return next(error);
  }

  if (existingUser) {
    const error = new Error("Recruiter exists already");
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new Error(
      "Could not create user, please try again."
    );
    return next(error);
  }

  const createdUser = new Recruiter({
    firstName,
    secondName,
    emailormobile,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
    const newRecruiter = new RecruiterProfile({
      recruiterId:createdUser.id,
      jobs:[]
      })
    await newRecruiter.save();
  } catch (err) {
    const error = new Error(
      "Signing up failed, please try again later save signup."
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, emailormobile: createdUser.emailormobile },
      "supersecret_dont_share"
      //   { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error(
      "Signing up failed, please try again later2."
    );
    return next(error);
  }

  
   



  res.status(201).json({
    userId: createdUser.id,
    emailormobile: createdUser.emailormobile,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { emailormobile, password } = req.body;

  let existingUser;

  try {
    existingUser = await Recruiter.findOne({ emailormobile: emailormobile });
  } catch (err) {
    const error = new Error(
      "Logging in failed, please try again later."
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new Error(
      "Invalid credentials, could not log you in."
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error(
      "Could not log you in, please check your credentials and try again."
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error(
      "Invalid credentials, could not log you in."
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, emailormobile: existingUser.emailormobile },
      "supersecret_dont_share"
      //   { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error(
      "Logging in failed, please try again later."
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    emailormobile: existingUser.emailormobile,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
