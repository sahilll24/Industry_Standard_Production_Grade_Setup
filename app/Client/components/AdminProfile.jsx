import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../src/api/client";

const AdminProfile = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setAdminData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!accessToken) {
      setError("Not authenticated");
      return;
    }

    const userId = user?.id || user?._id;
    if (!userId) {
      setError("User ID not found. Please refresh the page and login again.");
      console.error("User object:", user);
      return;
    }

    try {
      setStatus("loading");
      setError(null);
      console.log("Updating profile for user:", userId, "with data:", adminData);
      
      await apiRequest(`/users/${userId}`, {
        method: "PATCH",
        token: accessToken,
        body: adminData,
      });
      setStatus("succeeded");
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Admin Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={adminData.fullName}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            value={adminData.phone}
            onChange={handleChange}
            disabled={!editMode}
            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-6 text-right">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              disabled={status === "loading"}
              className="bg-green-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-700 disabled:bg-green-300"
            >
              {status === "loading" ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setError(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
