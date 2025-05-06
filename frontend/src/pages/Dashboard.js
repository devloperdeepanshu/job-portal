import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuth(); // Auth context to manage user state
  const navigate = useNavigate(); // Navigation hook to handle page routing
  const [jobs, setJobs] = useState([]); // State to store jobs for recruiters
  const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs for jobseekers

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      try {
        if (user?.role === "recruiter") { 
          // Fetch jobs posted by the recruiter
          const res = await fetch(`http://localhost:5000/api/jobs?recruiterId=${user.id}`);
          const data = await res.json();
          setJobs(data);
        } else if (user?.role === "jobseeker") {
          // Fetch jobs that the jobseeker has applied to
          const res = await fetch(`http://localhost:5000/api/jobs/applied-jobs`, {
            headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
          });
          const data = await res.json();

          // Check if the response is an array of applied jobs
          if (Array.isArray(data)) {
            setAppliedJobs(data); // Set applied jobs in state
          } else {
            setAppliedJobs([data]); // If no applied jobs, set empty array
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (user) {
      fetchData(); // Fetch data when user information is available
    }
  }, [user]); // Re-fetch data if user data changes

  if (!user) {
    return (
      <div className="text-center py-16 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {user.role === "recruiter"
            ? `Welcome, Recruiter ${user.name}`
            : `Welcome, ${user.name}`}
        </motion.h2>

        {user.role === "recruiter" ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold">Jobs You've Posted</h3>
            {jobs.length === 0 ? (
              <p>
                You haven’t posted any jobs yet.{" "}
                <span
                  className="underline cursor-pointer text-yellow-300 hover:text-yellow-400"
                  onClick={() => navigate("/post-job")}
                >
                  Post one now!
                </span>
              </p>
            ) : (
              <ul className="space-y-4">
                {jobs.map((job) => (
                  <motion.li
                    key={job._id}
                    className="p-5 bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-xl font-semibold">{job.title}</h4>
                    <p className="mt-1 text-gray-700">{job.description}</p>
                    <button
                      className="mt-3 text-indigo-600 font-medium hover:underline"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                    >
                      Edit Job
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">Your Profile</h3>
              <div className="text-lg space-y-1">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <p className="text-sm text-gray-200 mt-2">Keep your details up to date for better job matching.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Jobs You've Applied To</h3>
              {appliedJobs.length === 0 ? (
                <p>
                  You haven’t applied to any jobs yet.{" "}
                  <span
                    className="underline cursor-pointer text-yellow-300 hover:text-yellow-400"
                    onClick={() => navigate("/jobs")}
                  >
                    Browse openings now.
                  </span>
                </p>
              ) : (
                <ul className="space-y-4">
                  {appliedJobs.map((job) => (
                    <motion.li
                      key={job._id}
                      className="p-5 bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="text-xl font-semibold">{job.title}</h4>
                      <p className="text-gray-700">{job.company}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-4 flex justify-between items-center">
        <span className="text-sm sm:text-base">Welcome {user?.name || "Guest"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" 
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
