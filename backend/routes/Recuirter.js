const express = require("express");
const { check } = require("express-validator");

const recruiterController = require("../Controller/Recruiter/auth");
const ispresentController = require("../Controller/Recruiter/isPresent");
const recruiterProfileController = require("../Controller/Recruiter/profile");
const router = express.Router();
const checkAuth=require('../Middleware/check-auth')
router.get("/", (req, res, next) => {
  res.json({ message: "success" });
});
router.post("/signup", recruiterController.signup);

router.post("/login", recruiterController.login);

router.post("/ispresent", ispresentController.isPresent);

router.use(checkAuth)
router.get('/profile',recruiterProfileController.recruiterProfile);

router.patch("/addjob", recruiterProfileController.addjobs);

module.exports = router;
