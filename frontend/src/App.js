import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import JobList from "./pages/JobList";
import PrivateRoute from "./components/PrivateRoute";
import {Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";  // Loading screen component
import  { useState, useEffect } from "react"; 
import Edit from "./pages/Edit-job"; // Import the EditJob component
function App() {
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);  // Loading state to show the spinner
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

   // Simulate loading time, such as fetching user data or initial setup
   useEffect(() => {
    setTimeout(() => {
      setLoading(false);  // Hide loading screen after 2 seconds
    }, 2000);

    if (user) {
      setIsAuthenticated(true);  // If user is logged in, set authenticated state
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // If still loading, show the loading screen
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Router className="pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/post-job"
  element={
    user?.role === "recruiter" ? <PostJob /> : <Navigate to="/jobs" replace />
  }
/>
<Route
  path="/edit-job"
  element={
    user?.role === "recruiter" ? <JobDetails /> : <Navigate to="/jobs" replace />
  }
/>
<Route path="/edit-job/:jobId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
