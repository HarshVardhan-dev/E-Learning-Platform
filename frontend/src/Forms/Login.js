import React, { useState } from "react";
import { loginUser } from "../services/userService";

const Login = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await loginUser(formData);
      setSuccess(`Welcome, ${response.name}`);
      onAuthSuccess(response); // Invoke onAuthSuccess with user data
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
