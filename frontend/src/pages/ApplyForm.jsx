import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ApplyForm = () => {
  const { id } = useParams(); // 👈 Job ID from URL
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: ""
  });
  
  const [cvFile, setCvFile] = useState(null); // 👈 File state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("experience", form.experience);
    formData.append("coverLetter", form.coverLetter);
    formData.append("cv", cvFile); // 👈 Attach CV file
    formData.append("jobId", id); // Optional: Attach Job ID

    try {
      const response = await fetch("https://job-portal-1-backend.onrender.com/api/apply", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` // if needed
        }
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/jobs");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to apply.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <motion.div
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-indigo-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Apply for Job
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border px-4 py-3 rounded focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />
          <textarea
            name="experience"
            placeholder="Describe your work experience"
            className="w-full border px-4 py-3 rounded h-28 resize-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            required
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter (Optional)"
            className="w-full border px-4 py-3 rounded h-28 resize-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <div>
            <label className="block text-gray-700 mb-2">Upload CV:</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full"
              onChange={handleFileChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Application
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ApplyForm;
