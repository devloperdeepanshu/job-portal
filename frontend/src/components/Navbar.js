import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-blue-900 bg-opacity-95 text-white px-6 py-4 flex justify-between items-center shadow-xl w-full top-0 z-50 "
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="text-3xl font-extrabold tracking-wide text-yellow-400">
        Job Portal
      </Link>

      <div className="hidden md:flex space-x-8 items-center font-medium">
        <Link to="/" className="hover:text-yellow-300 transition-all duration-300">Home</Link>
        <Link to="/jobs" className="hover:text-yellow-300 transition-all duration-300">Browse Jobs</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-yellow-300 transition-all duration-300">Dashboard</Link>
            {user?.role === "recruiter" && (
              <Link
                to="/post-job"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300"
              >
                Post a Job
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition-all duration-300">Login</Link>
            <Link to="/register" className="hover:text-yellow-300 transition-all duration-300">Register</Link>
          </>
        )}
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
          <svg
            className="w-7 h-7 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-blue-900 bg-opacity-95 text-white p-6 space-y-4 md:hidden transition-all shadow-lg rounded-b-lg z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-300">Home</Link>
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-300">Browse Jobs</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-300">Dashboard</Link>
                {user?.role === "recruiter" && (
                  <Link
                    to="/post-job"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-yellow-400 text-blue-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-all"
                  >
                    Post a Job
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-300">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-300">Register</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
