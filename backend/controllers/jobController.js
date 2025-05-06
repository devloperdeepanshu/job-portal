const Job = require("../models/Job");
const mongoose = require("mongoose");
const User = require("../models/User");
// Post a new job
const postJob = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      postedBy: req.user.id,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const recruiterId = req.query.recruiterId;
    let jobs;

    if (recruiterId) {
      jobs = await Job.find({ postedBy: recruiterId }).sort({ createdAt: -1 });
    } else {
      jobs = await Job.find().sort({ createdAt: -1 });
    }

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apply to a job
const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if the user has already applied for this job
    const alreadyApplied = job.applications.some(
      (app) => app.user.toString() === req.user.id
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job." });
    }

    // Prepare application data
    const newApplication = {
      user: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.body.phone || "",
      experience: req.body.experience || "",
      coverLetter: req.body.coverLetter || "",
      cv: req.file ? req.file.path : "", // Save file path if file uploaded
    };

    job.applications.push(newApplication);
    await job.save();

    res.status(200).json({ message: "Applied successfully" });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Server error while applying" });
  }
};


module.exports = { applyToJob };


// Get all jobs user applied to
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("Authenticated user ID:", userId); // Optional debug

    const appliedJobs = await Job.find({
      "applications.user": new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(appliedJobs);
  } catch (err) {
    console.error("Get applied jobs error:", err);
    res.status(500).json({ message: "Server error while fetching applied jobs" });
  }
};


// Update an existing job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only update the fields you want to change
    job.title = req.body.title || job.title;
    job.company = req.body.company || job.company;
    job.description = req.body.description || job.description;

    // Prevent re-validation of subdocuments
    await job.save({ validateModifiedOnly: true });

    res.status(200).json(job);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Error updating job" });
  }
};


module.exports = { postJob, getAllJobs, getJobById, applyToJob, getAppliedJobs, updateJob };
