import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { account_input_tailwind_classes } from "./utils/utils";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Remove any existing tokens before login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    try {
      const response = await axiosInstance.post("accounts/login/", { email, password });

      // Save new tokens
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Redirect after login
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };


  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
