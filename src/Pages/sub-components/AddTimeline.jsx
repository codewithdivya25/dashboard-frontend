import {
  addNewTimeline,
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "../../Store/slices/timelineSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTimeline = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message, timeline } = useSelector(
    (state) => state.timeline
  );

  const handleAddNewTimeline = (e) => {
    e.preventDefault();

    dispatch(
      addNewTimeline({
        title,
        description,
        from,
        to,
      })
    );
  };

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    dispatch(getAllTimeline());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());

      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4 py-10">

      {/* FORM */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Add Timeline
          </h2>
          <p className="text-sm text-indigo-100">
            Add your experience / education journey
          </p>
        </div>

        <form onSubmit={handleAddNewTimeline} className="p-6 space-y-4">

          <input
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Title (e.g. Frontend Developer)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-xl"
              placeholder="From (2022)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <input
              className="p-3 border rounded-xl"
              placeholder="To (2024)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Adding..." : "Add Timeline"}
          </button>
        </form>
      </div>

      {/* TIMELINE LIST */}
      <div className="max-w-4xl mx-auto mt-10 space-y-4">

        {timeline?.length > 0 ? (
          timeline.map((item) => (
            <div
              key={item._id}
              className="bg-white border shadow-md rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-xl transition"
            >

              {/* LEFT */}
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {item.description}
                </p>

                {/* ✅ FIXED HERE */}
                <p className="text-sm text-indigo-600 font-medium mt-2">
                  {item.from} - {item.to}
                </p>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => handleDeleteTimeline(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
              >
                Delete
              </button>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No timeline found
          </p>
        )}

      </div>
    </div>
  );
};

export default AddTimeline;