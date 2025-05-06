import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (cv) formData.append("cv", cv);

    try {
      const response = await fetch("https://job-portal-1-backend.onrender.com/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || "Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      navigate("/jobs");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 px-4">
      <motion.div
        className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-8 text-center text-purple-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Create Your Profile
        </motion.h2>

        <form onSubmit={handleRegister} className="space-y-6" encType="multipart/form-data">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400" />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input type="text" name="experience" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea name="coverLetter" rows="4" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload CV (PDF, DOCX)</label>
                <input type="file" name="cv" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select name="role" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400">
                  <option value="jobseeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
