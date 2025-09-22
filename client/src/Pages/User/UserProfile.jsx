import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Loader from "../Components/Loader";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/accounts/profile/");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <><Loader /></>;

  // Generate initials if no profile image
  const initials = `${profile.first_name?.[0] || "U"}${profile.last_name?.[0] || "N"}`.toUpperCase();

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          {profile.profile_image ? (
            <img
              src={profile.profile_image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold shadow-md">
              {initials}
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-sm text-gray-500">@{profile.username}</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contact || "Not provided"}</p>
          <p><strong>Bio:</strong> {profile.bio || "No bio added yet."}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/update")}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/delete")}
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/logout")}
            className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
