import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, clearAllUserErrors } from "../Store/Slices/UserSlice";
import LoadingButton from "../Pages/sub-components/loadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(true);

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // ✅ FORM SUBMIT HANDLER
  const handleLogin = (e) => {
    e.preventDefault(); // page reload stop
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (!loading && isAuthenticated) {
      navigateTo("/", {replace: true});
    }
  }, [dispatch, isAuthenticated, error, loading, navigateTo]);

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-slate-100 to-slate-300
        dark:from-slate-900 dark:to-slate-800 transition"
      >
        {/* MAIN CARD */}
        <div
          className="flex w-full max-w-5xl mx-4
          rounded-2xl shadow-2xl overflow-hidden
          bg-white dark:bg-slate-800"
        >
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 p-8 lg:p-10 relative">
            {/* Accent line */}
            <div
              className="absolute top-0 left-0 w-full h-1
              bg-gradient-to-r from-indigo-500 to-purple-600"
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Welcome Back
              </h2>

              <button
                onClick={() => setDark(!dark)}
                className="text-xl text-gray-700 dark:text-gray-200"
              >
                {dark ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Enter your details to login
            </p>

            {/* ✅ FORM START */}
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border
                  dark:border-slate-600 bg-transparent
                  text-gray-800 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Password
                  </label>

                  <span
                    onClick={() => navigateTo("/password/forget")}
                    className="text-xs text-indigo-600 dark:text-indigo-400
                    cursor-pointer hover:underline"
                  >
                    Forgot your password?
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border
                    dark:border-slate-600 bg-transparent
                    text-gray-800 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2.5 cursor-pointer text-lg
                    text-gray-600 dark:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Button */}
              {loading ? (
                <LoadingButton content={"Logging In"} />
              ) : (
                <button
                  type="submit"
                  className="w-full mt-4 py-2 rounded-lg
                  bg-gradient-to-r from-indigo-500 to-purple-600
                  text-white font-medium hover:opacity-90 transition"
                >
                  Login
                </button>
              )}
            </form>
            {/* ✅ FORM END */}

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigateTo("/register")}
                className="text-indigo-600 dark:text-indigo-400
                font-medium cursor-pointer hover:underline"
              >
                Signup
              </span>
            </p>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hidden lg:block w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              alt="Login"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;