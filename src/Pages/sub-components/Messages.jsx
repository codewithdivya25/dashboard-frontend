import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Trash2,
  LayoutDashboard,
  Search,
  MessageCircleMore,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAllMessages,
  deleteMessage,
} from "../../Store/slices/messegesSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages, loading } = useSelector((state) => state.messages);

  const [selectedChat, setSelectedChat] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (messages?.length > 0) {
      setSelectedChat(messages[0]);
    }
  }, [messages]);

  const handleDelete = (id) => {
    dispatch(deleteMessage(id));
    setSelectedChat(null);

    setTimeout(() => {
      dispatch(getAllMessages());
    }, 400);
  };

  const filteredMessages = messages?.filter(
    (chat) =>
      chat.senderName?.toLowerCase().includes(search.toLowerCase()) ||
      chat.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[88vh] bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl overflow-hidden flex border border-gray-200">

      {/* LEFT SIDE */}
      <div className="w-full md:w-[34%] bg-white border-r flex flex-col">

        {/* Header */}
        <div className="p-5 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Mail className="w-6 h-6" />
                Messages
              </h1>
              <p className="text-sm text-blue-100 mt-1">
                {messages?.length || 0} Total Messages
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Dashboard
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-5 text-gray-500">Loading...</p>
          ) : filteredMessages?.length > 0 ? (
            filteredMessages.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b cursor-pointer transition-all duration-300 ${
                  selectedChat?._id === chat._id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">
                    {chat.senderName?.charAt(0)}
                  </div>

                  {/* Text */}
                  <div className="flex-1 overflow-hidden">
                    <h2 className="font-semibold text-gray-800 truncate">
                      {chat.senderName}
                    </h2>

                    <p className="text-sm text-gray-500 truncate">
                      {chat.subject}
                    </p>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="p-5 text-gray-400">No Messages Found</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50">

        {selectedChat ? (
          <>
            {/* Top Header */}
            <div className="p-5 bg-white border-b flex items-center justify-between shadow-sm">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                  {selectedChat.senderName?.charAt(0)}
                </div>

                <div>
                  <h2 className="font-bold text-gray-800 text-lg">
                    {selectedChat.senderName}
                  </h2>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(selectedChat._id)}
                className="p-3 rounded-xl bg-red-100 text-red-500 hover:bg-red-200 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>

            </div>

            {/* Body */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-3xl bg-white rounded-3xl shadow-md p-8 border">

                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <MessageCircleMore className="w-5 h-5" />
                  <span className="font-semibold">Subject</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-5">
                  {selectedChat.subject}
                </h3>

                <p className="text-gray-600 leading-8 text-[16px]">
                  {selectedChat.message}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Mail className="w-16 h-16 mb-4" />
            <p className="text-lg">Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;