import { clearAllUserErrors, resetProfile, updatePassword } from '../../Store/slices/UserSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock } from "lucide-react";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    if (newpassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(updatePassword(currentPassword, newpassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🔥 Background Gradient + Blur Circles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"></div>

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      {/* 🔥 Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full shadow-lg">
              <Lock className="text-white" size={22} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Update Password
          </h1>
          <p className="text-sm text-gray-500">
            Make your account more secure 🔐
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">

          {/* Input Field Component Style */}
          {[
            {
              value: currentPassword,
              set: setCurrentPassword,
              show: showCurrent,
              toggle: () => setShowCurrent(!showCurrent),
              placeholder: "Current Password"
            },
            {
              value: newpassword,
              set: setNewPassword,
              show: showNew,
              toggle: () => setShowNew(!showNew),
              placeholder: "New Password"
            },
            {
              value: confirmNewPassword,
              set: setConfirmNewPassword,
              show: showConfirm,
              toggle: () => setShowConfirm(!showConfirm),
              placeholder: "Confirm Password"
            }
          ].map((field, i) => (
            <div key={i} className="relative group">
              <input
                type={field.show ? "text" : "password"}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <span
                onClick={field.toggle}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 group-hover:text-blue-600 transition"
              >
                {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          ))}

        </div>

        {/* Button */}
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500">
          Strong password = Strong security 💪
        </p>

      </div>
    </div>
  );
};

export default UpdatePassword;