const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  postJob,
  getAllJobs,
  getJobById,
  applyToJob,
  getAppliedJobs,
  updateJob,
} = require("../controllers/jobController");

router.get("/", getAllJobs);
router.post("/", auth, postJob);
router.get("/applied-jobs", auth, getAppliedJobs); // <- This line
router.get("/:id", getJobById);
router.post("/:id/apply", auth, applyToJob);
router.put("/:id", auth, updateJob);

module.exports = router;
