import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    navigate("/");
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

        {/* Animated GIF or Illustration */}
        <div className="mt-8">
          <motion.img
            src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
            alt="Learning Animation"
            className="w-full max-w-md md:max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
