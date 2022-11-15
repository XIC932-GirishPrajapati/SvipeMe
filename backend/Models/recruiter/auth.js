const mongoose = require("mongoose");

const RecuireterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  emailormobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Recruiter = mongoose.model("Recruiter", RecuireterSchema);

module.exports = Recruiter;
