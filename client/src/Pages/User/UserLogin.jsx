import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { account_input_tailwind_classes } from "./utils/utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ use AuthContext

  useEffect(() => {
    document.title = "User Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove any existing tokens before login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    try {
      const response = await axiosInstance.post("accounts/login/", { email, password });

      // Use context to save tokens and update app state
      login(response.data.access_token, response.data.refresh_token);

      toast.success("Logged in successfully!");
      navigate("/"); // Navigate after login
    } catch (err) {
      const responseData = err.response?.data;
      if (responseData && typeof responseData === "object") {
        const messages = Object.values(responseData).flat().join(" | ");
        toast.error(messages);
      } else {
        toast.error(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
