import axios from "axios";

export const SET_PROFILE="SET_PROFILE";

const LINK = 'https://wise-termite-35.loca.lt'

export const setUserProfileDetails = (personalData,proffesionalData,skills,certificates,userId) => {
    return async (dispatch) => {
  //  console.log(getState())

     const link='https://wise-termite-35.loca.lt/api/user/profile'
    
     const data = {
      persional:{
    name: personalData.name,
    dateofbirth: personalData.dateofbirth,
    gender: personalData.gender,
    pan: personalData.pan,
    phonenumber: personalData.phonenumber,
      }
      ,
        userId:userId,
      proffesional:{
        profileset: proffesionalData.profileset,
        profile: proffesionalData.profile,
        destination: proffesionalData.destination,
        currentorg: proffesionalData.currentorg,
        currentctc: proffesionalData.ctc,
        location: proffesionalData.location,
        resume: "???",
        certificates:certificates
      ,
      skills:skills
      }
   
   
   }
   
console.log(data.proffesional)
console.log(certificates)
console.log(skills)
  console.log('================================');
//   console.log(userProfile)
axios.put(link,data).then(response =>console.log(response.data)).catch(error =>console.log(error))

  console.log('================================');
    }
}





 