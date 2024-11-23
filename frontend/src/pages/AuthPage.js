import React, { useState, useContext } from "react";
import Login from "../Forms/Login.js"; // Import Login component
import Register from "../Forms/Register.js"; // Import Register component
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const { login } = useContext(AuthContext); // Get Login function from AuthContext

  const onAuthSuccess = (userData) => {
    login(userData); //Update the AuthContext with user data
    navigate(redirect); // Redirect to the intended course or fallback to home
  };

  const handleHomeReturn = () => {
    navigate("/");
  };

  const toggleAuthView = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        {/* Show Login or Register Component Based on isLogin */}
        {isLogin ? (
          <Login onAuthSuccess={onAuthSuccess} />
        ) : (
          <Register onAuthSuccess={onAuthSuccess} />
        )}
        <div className="text-center mt-4">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={toggleAuthView}
                className="text-blue-600 underline"
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={toggleAuthView}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
        <button onClick={handleHomeReturn}>Back to Home</button>
      </div>
    </div>
  );
};

export default AuthPage;
