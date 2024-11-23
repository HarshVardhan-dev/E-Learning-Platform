import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Access user and logout function from AuthContext

  const handleExploreCourses = () => {
    navigate("/");
  };

  const handleAuthPage = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout(); // Clear user data and token
    navigate("/"); // Redirect to home page
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-8 text-white">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Your E-Learning Hub
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Unlock new skills and explore endless possibilities with our
          interactive courses.
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={handleExploreCourses}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 font-semibold"
          >
            Explore Courses
          </button>
        </motion.div>

        {/* User Auth Section */}
        <motion.div className="mt-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <p className="text-lg font-semibold">
                Welcome, <span className="text-yellow-300">{user.name}</span>
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleAuthPage}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 font-semibold"
            >
              Sign In/Register
            </button>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
