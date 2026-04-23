import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Trash2, UploadCloud } from "lucide-react";

import {
  addNewSoftwareApplication,
  clearAllSoftwareAppErrors,
  resetSoftwareApplicationSlice,
  getAllSoftwareApplications,
  deleteSoftwareApplication,
} from "../../Store/slices/softwareApplicationSlice";

const AddSoftwareApplications = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const dispatch = useDispatch();

  const {
    loading,
    error,
    message,
    softwareApplications,
  } = useSelector((state) => state.softwareApplications);

  const handleSvg = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const handleAddSoftwareApp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);

    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    dispatch(getAllSoftwareApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());

      setName("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Applications
            </h2>

            <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold">
              {softwareApplications?.length || 0} Total
            </span>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
            {softwareApplications?.length > 0 ? (
              softwareApplications.map((item) => (
                <div
                  key={item._id}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl border flex items-center justify-center">
                      <img
                        src={item.svg?.url}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Software Tool
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(deleteSoftwareApplication(item._id))
                    }
                    className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-20">
                No Applications Found
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-8">
            <h2 className="text-3xl font-bold text-white">
              Add New Application
            </h2>
            <p className="text-indigo-100 mt-2 text-sm">
              Upload tools professionally for portfolio showcase
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleAddSoftwareApp}
            className="p-8 space-y-7"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Name
              </label>

              <input
                type="text"
                placeholder="e.g. VS Code"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Logo
              </label>

              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-3xl min-h-[240px] bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50 transition flex flex-col justify-center items-center text-center p-6">

                {svgPreview ? (
                  <>
                    <img
                      src={svgPreview}
                      alt="Preview"
                      className="w-24 h-24 object-contain mb-4"
                    />
                    <p className="text-sm text-gray-600 font-medium">
                      Click to change image
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
                      <UploadCloud className="text-indigo-600" />
                    </div>

                    <h3 className="font-semibold text-gray-700">
                      Upload Application Logo
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, SVG up to 10MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  onChange={handleSvg}
                  className="hidden"
                />
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-lg hover:scale-[1.01] transition-all"
            >
              {loading ? "Adding Application..." : "Add Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSoftwareApplications;