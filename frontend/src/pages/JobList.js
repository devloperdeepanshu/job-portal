import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [applyingJobId, setApplyingJobId] = useState(null); // Track job being applied for
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://job-portal-1-backend.onrender.com/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm) ||
    job.company.toLowerCase().includes(searchTerm)
  );

  const applyToJob = async (jobId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must login to apply!");
      return;
    }
  
    if (applyingJobId === jobId) {
      alert("You are already applying for this job. Please wait.");
      return;
    }
  
    try {
      setApplyingJobId(jobId);
      const res = await fetch(`https://job-portal-1-backend.onrender.com/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "123-456-7890", // Replace with user input if available
          experience: "2 years in React", 
          coverLetter: "I'm very interested in this job.",
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Successfully applied!");
      } else {
        alert(data.message || "Failed to apply.");
        console.error("Error:", data.message || "Unknown error");
      }
    } catch (error) {
      alert("An error occurred while applying. Please try again.");
     
    } finally {
      setApplyingJobId(null);
    }
  };
  

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Available Jobs
        </motion.h1>

        <motion.input
          type="text"
          placeholder="Search by title or company"
          className="w-full border px-4 py-3 rounded mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={handleSearch}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        />

        {filteredJobs.length === 0 ? (
          <p className="text-center">No matching jobs found.</p>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                className="p-6 bg-white text-gray-900 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
                <p className="text-gray-800 font-medium">{job.company}</p>
                <p className="text-gray-600 mt-2">{job.description}</p>
                {job.postedBy && (
                  <p className="text-sm text-gray-500 mt-3">Posted by: {job.postedBy.id}</p>
                )}
                {user?.role === "jobseeker" && (
                  <motion.button
                    onClick={() => applyToJob(job._id)}
                    disabled={applyingJobId === job._id} // Disable if applying
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 mt-4 px-4 py-2 rounded-xl shadow-xl transition-transform transform hover:scale-105"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {applyingJobId === job._id ? "Applying..." : "Apply Now"}
                  </motion.button>
                )}
              </motion.div>
            ))} 
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobList;
