import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  account_input_tailwind_classes,
  account_input_tailwind_file_classes,
  account_textarea_tailwind_classes,
} from "./utils/utils";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    contact: "",
    bio: "",
    password: "",
    password2: "",
    profile_image: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image") {
      setFormData({ ...formData, profile_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      await axiosInstance.post("/accounts/register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 break-words">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          {/* First + Last name in grid on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                className={account_input_tailwind_classes}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                className={account_input_tailwind_classes}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Contact number"
              value={formData.contact}
              onChange={handleChange}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Write a short bio..."
              value={formData.bio}
              onChange={handleChange}
              className={account_textarea_tailwind_classes}
              rows="3"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={handleChange}
              className={account_input_tailwind_file_classes}
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={account_input_tailwind_classes}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                placeholder="Confirm password"
                value={formData.password2}
                onChange={handleChange}
                className={account_input_tailwind_classes}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
