import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAllforgotPasswordErrors } from "../Store/slices/forgotResetPasswordSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-components/loadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword || {}
  );
  const { isAuthenticated } = useSelector((state) => state.user || {});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllforgotPasswordErrors());
    }

    if (message) {
      toast.success(message);
    }

    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, message, isAuthenticated, navigateTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Button */}
          {loading ? (
            <LoadingButton content={"Sending..."} />
          ) : (
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:opacity-90 transition"
            >
              Send Reset Link
            </button>
          )}
        </form>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember password?{" "}
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

export default ForgotPassword;