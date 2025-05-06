import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 👈 import motion
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobSeekers, setJobSeekers] = useState(0);
  const [jobsPosted, setJobsPosted] = useState(0);
  const [activeRecruiters, setActiveRecruiters] = useState(0);
  const navigate = useNavigate();

  // Randomize numbers for impact section
  useEffect(() => {
    const randomIncrease = (start, max) => Math.floor(Math.random() * max) + start;

    const interval = setInterval(() => {
      setJobSeekers(prev => randomIncrease(prev, 100));
      setJobsPosted(prev => randomIncrease(prev, 50));
      setActiveRecruiters(prev => randomIncrease(prev, 30));
    }, 100);

    // Stop after 2 seconds to prevent indefinite updating
    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            className="text-5xl font-extrabold mb-4 animate-pulse"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            🚀 Find Your Dream Job
          </motion.h1>
          <p className="text-lg mb-8">Browse hundreds of job listings and discover the perfect role that matches your skills and passion.</p>
          <motion.button
            onClick={() => navigate("/jobs")}
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-xl shadow-xl hover:bg-yellow-500 transition-transform transform hover:scale-105"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            Browse Jobs
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-100 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center px-6">
          <motion.h2
            className="text-4xl font-extrabold text-blue-700 mb-14"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            🌟 Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">🧠 Wide Variety of Jobs</h3>
              <p className="text-gray-600">We offer job listings across a variety of industries, from tech to marketing to design.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">🔍 Easy Job Search</h3>
              <p className="text-gray-600">Use powerful filters to find jobs by location, skills, and salary range effortlessly.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">💸 Free for Job Seekers</h3>
              <p className="text-gray-600">Everything is free for job seekers—search, apply, and take control of your career.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Metrics Section */}
      <motion.section
        className="bg-gradient-to-br from-green-500 to-teal-600 text-white py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-extrabold mb-10"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            📊 Our Impact
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <motion.h3
                className="text-3xl font-semibold mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {jobSeekers}+
              </motion.h3>
              <p className="text-lg">Job Seekers</p>
            </div>
            <div>
              <motion.h3
                className="text-3xl font-semibold mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {jobsPosted}+
              </motion.h3>
              <p className="text-lg">Jobs Posted</p>
            </div>
            <div>
              <motion.h3
                className="text-3xl font-semibold mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {activeRecruiters}+
              </motion.h3>
              <p className="text-lg">Active Recruiters</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-20 text-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.2 }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-4 animate-bounce"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            📈 Ready for the Next Step?
          </motion.h2>
          <p className="text-lg mb-6">Start browsing jobs and apply today. Your future starts here.</p> 
          <motion.button
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-xl shadow-xl hover:bg-yellow-500 transition-transform transform hover:scale-105"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            Register Now
          </motion.button>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
  <div className="max-w-7xl mx-auto text-center px-6">
    {/* Copyright and Links */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="text-lg font-semibold text-yellow-400">
        <span className="text-white">© 2025</span> Job Portal. All rights reserved.
      </div>
      <div className="mt-4 sm:mt-0 space-x-4">
        <a href="#terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">Terms of Service</a>
        <a href="#privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">Privacy Policy</a>
        <a href="#contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">Contact</a>
      </div>
    </div>

    {/* Social Media Icons */}
    <div className="flex justify-center space-x-6 mb-6">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
        <i className="fab fa-facebook fa-2x"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
        <i className="fab fa-twitter fa-2x"></i>
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
    </div>

    {/* Newsletter Signup */}
    <div className="text-center">
      <p className="text-sm mb-4 text-gray-400">Stay updated with the latest job listings and career tips.</p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
        />
        <button className="bg-yellow-400 text-gray-900 py-2 px-6 rounded-r-lg font-bold hover:bg-yellow-500 transition-colors duration-200">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</footer>

 

    </div>
  );
};

export default Home;
