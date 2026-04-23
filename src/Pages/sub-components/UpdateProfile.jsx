import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "../../Store/slices/UserSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutme || "");
  const [linkedinURL, setLinkedinURL] = useState(user?.linkedinURL || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || null);

  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || null);

  // 🔹 Avatar Handler
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(file);
      }
    };

    reader.readAsDataURL(file);
  };

  // 🔹 Resume Handler
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setResumePreview(reader.result);
        setResume(file);
      }
    };

    reader.readAsDataURL(file);
  };

  // 🔹 Submit Handler
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("linkedinURL", linkedinURL);
    formData.append("portfolioURL", portfolioURL);
    formData.append("githubURL", githubURL);

    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);

    dispatch(updateProfile(formData));

    console.log("Form Submitted ✅");
  };

  return (
    <div className="w-full p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {!editMode ? (
        /* ================= VIEW MODE ================= */
        <div className="bg-white p-6 rounded shadow space-y-6">

          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              className="w-24 h-24 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>

          <p><b>Phone:</b> {phone || "-"}</p>
          <p><b>About:</b> {aboutMe || "-"}</p>

          <p>
            <b>LinkedIn:</b>{" "}
            {linkedinURL ? (
              <a href={linkedinURL} target="_blank" className="text-blue-600">
                {linkedinURL}
              </a>
            ) : "-"}
          </p>

          <p>
            <b>GitHub:</b>{" "}
            {githubURL ? (
              <a href={githubURL} target="_blank" className="text-blue-600">
                {githubURL}
              </a>
            ) : "-"}
          </p>

          <p>
            <b>Portfolio:</b>{" "}
            {portfolioURL ? (
              <a href={portfolioURL} target="_blank" className="text-blue-600">
                {portfolioURL}
              </a>
            ) : "-"}
          </p>

          <p>
            <b>Resume:</b>{" "}
            {resumePreview ? (
              <a href={resumePreview} target="_blank" className="text-blue-600">
                View Resume
              </a>
            ) : "No Resume"}
          </p>

        </div>
      ) : (
        /* ================= EDIT MODE ================= */
        <form onSubmit={handleUpdateProfile} className="space-y-4">

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="border p-2 w-full"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="border p-2 w-full"
          />

          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="About Me"
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={linkedinURL}
            onChange={(e) => setLinkedinURL(e.target.value)}
            placeholder="LinkedIn URL"
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder="GitHub URL"
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
            placeholder="Portfolio URL"
            className="border p-2 w-full"
          />

          {/* Avatar */}
          <input type="file" onChange={avatarHandler} />
          {avatarPreview && (
            <img src={avatarPreview} className="w-20 h-20 rounded-full" />
          )}

          {/* Resume */}
          <input type="file" onChange={resumeHandler} />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;