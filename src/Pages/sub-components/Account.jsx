import React, { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  const tabs = [
    { name: "Profile" },
    { name: "Update Profile" },
    { name: "Update Password" },
  ];

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Account Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your profile and account settings
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">

        {/* Sidebar Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-3 flex md:flex-col gap-2 overflow-x-auto">

          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedComponent(tab.name)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                selectedComponent === tab.name
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 min-h-[400px]">

          {selectedComponent === "Profile" && <Profile />}
          {selectedComponent === "Update Profile" && <UpdateProfile />}
          {selectedComponent === "Update Password" && <UpdatePassword />}

        </div>
      </div>
    </div>
  );
};

export default Account;