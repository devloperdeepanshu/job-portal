import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 👉 Import framer-motion

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", form);
      alert("Job posted successfully!");
      navigate("/jobs");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-500">
      <motion.div
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-green-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Post a Job
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Job Description"
            className="w-full border border-gray-300 px-4 py-3 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <motion.button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Post Job
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default PostJob;
