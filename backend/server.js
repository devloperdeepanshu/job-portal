const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
 // Import the Application model

const app = express();

app.use(cors());
app.use(express.json());

// POST /api/applications - Apply for a job 
app.post("/ ", async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ userId, jobId });

    // If the user has already applied, return an error response
    if (existingApplication) {
      return res.status(409).json({ message: "You have already applied for this job." });
    }

    // If not, save the new application
    const newApplication = new Application({ userId, jobId });
    await newApplication.save();

    res.status(201).json({ message: "Application successful." });
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
