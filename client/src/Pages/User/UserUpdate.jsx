import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  account_input_tailwind_classes,
  account_input_tailwind_file_classes,
  account_textarea_tailwind_classes,
} from "./utils/utils";

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    contact: "",
    bio: "",
    profile_image: null,
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/accounts/profile/");
        setFormData({
          ...res.data,
          profile_image: null, // don't overwrite file input
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

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
        if (formData[key] !== null) data.append(key, formData[key]);
      }

      await axiosInstance.put("/accounts/update/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setMessage(null);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Profile
        </h2>

        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && (
          <p className="text-red-500 text-sm mb-4 break-words">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={account_input_tailwind_classes}
              required
            />
          </div>

          {/* First + Last name in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
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
                placeholder="Last Name"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
