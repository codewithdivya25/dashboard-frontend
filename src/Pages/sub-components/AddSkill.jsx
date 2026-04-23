import {
  addNewSkill,
  deleteSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "../../Store/slices/addSkillSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  UploadCloud,
  Award,
  Code2,
  Trash2,
} from "lucide-react";

import LoadingButton from "./loadingButton";

const AddSkill = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const {
    loading,
    message,
    error,
    skills,
  } = useSelector((state) => state.skill);

  const handleSvg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);

    dispatch(addNewSkill(formData));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetSkillSlice());
      dispatch(getAllSkills());

      setTitle("");
      setProficiency("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 py-8 md:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Add Skill Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8 text-white">
            <h2 className="text-3xl font-bold">
              Add New Skill
            </h2>

            <p className="mt-2 text-indigo-100">
              Add your technical skills.
            </p>
          </div>

          <form
            onSubmit={handleAddNewSkill}
            className="p-6 space-y-7"
          >
            {/* Title */}
            <div>
              <label className="mb-2 text-sm font-semibold text-gray-700 flex gap-2 items-center">
                <Code2 size={16} />
                Skill Name
              </label>

              <input
                type="text"
                placeholder="React JS"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Proficiency */}
            <div>
              <label className="mb-2 text-sm font-semibold text-gray-700 flex gap-2 items-center">
                <Award size={16} />
                Proficiency %
              </label>

              <input
                type="number"
                placeholder="90"
                value={proficiency}
                onChange={(e) =>
                  setProficiency(e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                Upload Skill Icon
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
                {svgPreview ? (
                  <img
                    src={svgPreview}
                    alt="preview"
                    className="w-20 h-20 object-contain mb-4"
                  />
                ) : (
                  <UploadCloud
                    size={42}
                    className="text-gray-400 mb-3"
                  />
                )}

                <p className="font-medium text-gray-700">
                  Click to Upload File
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={handleSvg}
                />
              </label>
            </div>

            {/* Submit */}
            <div>
              {!loading ? (
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:opacity-90"
                >
                  Add Skill
                </button>
              ) : (
                <LoadingButton
                  content={"Adding Skill"}
                />
              )}
            </div>
          </form>
        </div>

        {/* Skill List */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            All Skills
          </h2>

          <div className="space-y-4 max-h-[650px] overflow-y-auto">
            {skills?.length > 0 ? (
              skills.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.svg?.url}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.proficiency}%
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDeleteSkill(item._id)
                    }
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No Skills Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;