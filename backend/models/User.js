const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "recruiter"], required: true },
  phone: { type: String },
  experience: { type: String },
  coverLetter: { type: String },
  cv: { type: String }, // stores file name or path
});

module.exports = mongoose.model("User", userSchema);
