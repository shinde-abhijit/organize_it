import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const UserLogout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "User Logout";
  }, []);
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    try {
      logout();              // clears token and triggers cross-tab logout
      toast.success("Logged out successfully!");
      navigate("/login");    // redirect to login page
    } catch (err) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to logout from your account.
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserLogout;
