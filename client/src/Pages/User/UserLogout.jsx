import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const UserLogout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();              // clears token and triggers cross-tab logout
    navigate("/login");    // redirect to login page
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to logout from your account.
        </p>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg animate-fadeIn text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout from your account?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogout;
