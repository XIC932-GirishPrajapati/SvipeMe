const { validationResult } = require("express-validator");
// const HttpError = require("../../Models/http-Error");
const UserProfile = require("../../Models/user/profile");

const userProfile = async (req, res, next) => {
  const { userId, persional, proffesional } = req.body;
  const createProfile = new UserProfile({
    userId,
    persional,
    proffesional,
  });
console.log(createProfile)
  try {
    await createProfile.save();
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Something went wrong, could not update profile."
    );
    return next(error);
  }
  res.status(200).json({ createProfile: createProfile });
};


const getallMatcingJobs=async(req,res,next)=>{
const {userId}=req.body;

}



exports.getallMatcingJobs=getallMatcingJobs;
exports.userProfile = userProfile;
