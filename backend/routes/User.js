const express = require("express");
// const { check } = require("express-validator");

const usersController = require("../Controller/User/auth");
const userProfileController = require("../Controller/User/profile");
const ispresentController = require("../Controller/User/isPresent");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "success user" });
});
router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.put("/profile", userProfileController.userProfile);

router.post("/ispresent", ispresentController.isPresent);


module.exports = router;
