import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and preview your personal information
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 space-y-6">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Avatar + Info */}
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border shadow"
            />

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {user?.fullName}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Resume */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <span className="text-sm text-gray-500">Resume</span>

            {user?.url ? (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow"
              >
                View Resume
              </a>
            ) : (
              <p className="text-gray-400 text-sm">No Resume</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Phone */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Phone</p>
            <div className="p-3 rounded-lg bg-gray-50 border text-gray-700">
              {user?.phone || "-"}
            </div>
          </div>

          {/* Portfolio */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Portfolio</p>
            {user?.portfolioURL ? (
              <a
                href={user.portfolioURL}
                target="_blank"
                className="block p-3 rounded-lg bg-gray-50 border text-blue-600 hover:underline break-all"
              >
                {user.portfolioURL}
              </a>
            ) : (
              <div className="p-3 rounded-lg bg-gray-50 border text-gray-400">
                -
              </div>
            )}
          </div>

          {/* Github */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">GitHub</p>
            {user?.githubURL ? (
              <a
                href={user.githubURL}
                target="_blank"
                className="block p-3 rounded-lg bg-gray-50 border text-blue-600 hover:underline break-all"
              >
                {user.githubURL}
              </a>
            ) : (
              <div className="p-3 rounded-lg bg-gray-50 border text-gray-400">
                -
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">LinkedIn</p>
            {user?.linkedinURL ? (
              <a
                href={user.linkedinURL}
                target="_blank"
                className="block p-3 rounded-lg bg-gray-50 border text-blue-600 hover:underline break-all"
              >
                {user.linkedinURL}
              </a>
            ) : (
              <div className="p-3 rounded-lg bg-gray-50 border text-gray-400">
                -
              </div>
            )}
          </div>

          {/* About */}
          <div className="sm:col-span-2 space-y-1">
            <p className="text-xs text-gray-400">About Me</p>
            <div className="p-4 rounded-lg bg-gray-50 border text-gray-700 min-h-[100px]">
              {user?.aboutme || "No description added"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;