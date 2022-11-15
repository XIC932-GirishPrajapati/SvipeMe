// const HttpError = require("../../Models/http-Error");
const RecruiterProfile = require('../../Models/recruiter/recruiterProfile');

//get the all jobs which has added by recruiter
const recruiterProfile =async(req, res, next) =>{
  const recruiterId=(req.userData.userId);
    let existingRecruiter;
    try {
      existingRecruiter = await RecruiterProfile.findOne({ recruiterId: recruiterId});

    } catch (err) {
      const error = new Error(
        "No recruiter is present"
      );
      return next(error);
    }

   if(!existingRecruiter){
    const error = new Error(
        "No jobs added by you"
      );
      return next(error);
   }

    res.json({existingRecruiter: existingRecruiter});
  
}

//add the jobs by recruiter

const addjobs=async(req, res, next)=> {
    const {job}=req.body;
    console.log(job);
    const recruiterId=(req.userData.userId);
    let existingRecruiter;
    try {
      existingRecruiter = await RecruiterProfile.findOne({ recruiterId: recruiterId});
    } catch (err) {
      const error = new Error(
        "No recruiter is present"
      );
      return next(error);
    }
   existingRecruiter.jobs.push(job); 
console.log(existingRecruiter)
 try {  
    await existingRecruiter.save();
  } catch (err) {
      console.log(err);
    const error = new Error(
      'Something went wrong, could not add new job'
    );
    return next(error);
  }
 
  res.json({existingRecruiter: existingRecruiter})

}



exports.recruiterProfile= recruiterProfile;
exports.addjobs=addjobs;