const { validationResult } = require("express-validator");
// const HttpError = require("../../Models/http-Error")
const Recruiter = require("../../Models/recruiter/auth");

const isPresent = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return next(
  //       new HttpError("Invalid inputs passed, please check your data.", 422)
  //     );
  //   }
  console.log("isPresent");

  const emailormobile = req.body.email;

  console.log(emailormobile);

  let existingUser;
  let result = false;
  try {
    existingUser = await Recruiter.findOne({ emailormobile: emailormobile });
    console.log(existingUser);
  } catch (err) {
    const error = new Error(
      "Signing up failed, please try again later isPresent."
    );
    return next(error);
  }
  if (existingUser) {
    result = true;
  }

  res.status(200).json({ existingUser: result });
};
exports.isPresent = isPresent;
