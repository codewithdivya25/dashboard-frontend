import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProject,
  getAllProjects,
  deleteProject,
  updateProject,
  clearAllProjectErrors,
  resetProjectSlice,
} from "../../Store/slices/ProjectSlice";
import { toast } from "react-toastify";
import {
  Trash2,
  Pencil,
  Plus,
  ArrowLeft,
  UploadCloud,
} from "lucide-react";

const AddProject = () => {
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const [projectBanner, setProjectBanner] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      clearForm();
    }
  }, [error, message]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setGitRepoLink("");
    setProjectLink("");
    setStack("");
    setDeployed("");
    setProjectBanner("");
    setPreview("");
    setEditId(null);
    setShowForm(false);
  };

  const imageHandler = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setProjectBanner(file);
      setPreview(reader.result);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("stack", stack);
    formData.append("deployed", deployed);

    if (projectBanner) {
      formData.append("ProjectBanner", projectBanner);
    }

    if (editId) {
      dispatch(updateProject(editId, formData));
    } else {
      dispatch(addNewProject(formData));
    }
  };

  const editHandler = (item) => {
    setShowForm(true);
    setEditId(item._id);

    setTitle(item.title);
    setDescription(item.description);
    setGitRepoLink(item.gitRepoLink);
    setProjectLink(item.projectLink);
    setStack(item.stack);
    setDeployed(item.deployed);
    setPreview(item.projectBanner?.url || "");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* TOP BUTTONS */}
        <div className="flex gap-3 mb-6">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={18} />
              Add New Project
            </button>
          ) : (
            <button
              onClick={clearForm}
              className="bg-gray-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800"
            >
              <ArrowLeft size={18} />
              Back To Projects
            </button>
          )}
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editId ? "Edit Project" : "Add New Project"}
            </h2>

            <form
              onSubmit={submitHandler}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Project Title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Stack"
                className="input"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
              />

              <input
                type="text"
                placeholder="GitHub Link"
                className="input"
                value={gitRepoLink}
                onChange={(e) => setGitRepoLink(e.target.value)}
              />

              <input
                type="text"
                placeholder="Live Link"
                className="input"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />

              <select
                className="input"
                value={deployed}
                onChange={(e) => setDeployed(e.target.value)}
              >
                <option value="">Deployed?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {/* IMAGE */}
              <label className="input cursor-pointer flex items-center gap-2">
                <UploadCloud size={18} />
                Upload Banner
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    imageHandler(e.target.files[0])
                  }
                />
              </label>

              <textarea
                rows="4"
                placeholder="Description"
                className="input md:col-span-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-56 object-cover rounded-xl md:col-span-2"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                {loading
                  ? "Please Wait..."
                  : editId
                  ? "Update Project"
                  : "Add Project"}
              </button>
            </form>
          </div>
        )}

        {/* PROJECTS */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={item.projectBanner?.url}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-blue-600 text-sm mt-1">
                  {item.stack}
                </p>

                <p className="text-gray-500 mt-3 text-sm line-clamp-3">
                  {item.description}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => editHandler(item)}
                    className="flex-1 bg-green-100 text-green-700 py-2 rounded-xl hover:bg-green-200 flex justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      dispatch(deleteProject(item._id))
                    }
                    className="flex-1 bg-red-100 text-red-700 py-2 rounded-xl hover:bg-red-200 flex justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .input{
            width:100%;
            padding:12px 14px;
            border:1px solid #d1d5db;
            border-radius:12px;
            outline:none;
          }

          .input:focus{
            border-color:#2563eb;
            box-shadow:0 0 0 3px rgba(37,99,235,.15);
          }
        `}
      </style>
    </div>
  );
};

export default AddProject;