import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  resetPassword,
  clearAllforgotPasswordErrors,
} from "../Store/slices/forgotResetPasswordSlice";

const ResetPassword = () => {
  const navigateTo = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword || {}
  );
  const { isAuthenticated } = useSelector((state) => state.user || {});

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // ✅ Dispatch reset password action
    dispatch(resetPassword({ token, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllforgotPasswordErrors());
    }

    if (message) {
      toast.success(message);
      navigateTo("/login");
    }

    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, message, isAuthenticated, navigateTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          {loading ? (
            <button
              disabled
              className="w-full py-2 rounded-lg bg-gray-400 text-white"
            >
              Resetting...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:opacity-90 transition"
            >
              Reset Password
            </button>
          )}
        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Back to{" "}
          <span
            onClick={() => navigateTo("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;