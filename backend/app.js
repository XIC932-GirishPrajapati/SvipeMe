const express = require("express");
// const HttpError = require("./Models/http-Error");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/User");
const recuirterRoutes = require("./routes/Recuirter");
const uploaderRoutes = require("./routes/help")
app.use(express.json());
const PORT=9000;
const connectDB = require("./config/db");
connectDB(); //conntecting to the databse

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
app.use("/api/upload",uploaderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recruiter", recuirterRoutes);



app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT, () => {
  console.log("localhost:", PORT);
});

// XoJUf9RPJ6Nn7bVD
