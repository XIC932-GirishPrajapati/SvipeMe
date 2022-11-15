const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI
const connectDB = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("connection failed to connect db", err);
    });
};

module.exports = connectDB;
