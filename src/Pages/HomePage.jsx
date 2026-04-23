import {
  Home,
  FolderGit,
  History,
  LogOut,
  MessageSquareMore,
  PanelLeft,
  Package2,
  PencilRuler,
  LayoutGrid,
  User,
  X,
} from "lucide-react";

import {
  clearAllUserErrors,
  logout,
} from "../Store/slices/UserSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";

import { Button } from "../components/ui/button";

import Dashboard from "./sub-components/Dashboard";
import AddProject from "./sub-components/AddProject";
import AddSkill from "./sub-components/AddSkill";
import AddApplication from "./sub-components/AddSoftwareApplications";
import AddTimeline from "./sub-components/AddTimeline";
import Messages from "./sub-components/Messages";
import Account from "./sub-components/Account";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const [openSidebar, setOpenSidebar] = useState(true);

  const { isAuthenticated, error, user, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
    navigate("/login");
  };

 useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearAllUserErrors());
  }

  
  if (!loading && isAuthenticated === false) {
    navigate("/login");
  }
}, [error, isAuthenticated, loading, dispatch, navigate]);

  // 🔥 Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Add Project", icon: FolderGit },
    { name: "Add Skill", icon: PencilRuler },
    { name: "Add Application", icon: LayoutGrid },
    { name: "Add Timeline", icon: History },
    { name: "Messages", icon: MessageSquareMore },
    { name: "Account", icon: User },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Sidebar */}
      <aside
        className={`hidden sm:flex fixed inset-y-0 left-0 w-64 bg-white shadow-sm border-r p-4 flex-col justify-between z-50 transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Package2 className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">
                Dashboard
              </span>
            </div>

            <button onClick={() => setOpenSidebar(false)}>
              <X className="h-5 w-5 text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  active === item.name
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className={`flex flex-col flex-1 ${openSidebar ? "sm:ml-64" : ""}`}>

        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-40">

          {!openSidebar && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpenSidebar(true)}
              className="hidden sm:flex"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-3 mt-6">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActive(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      active === item.name
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* User */}
          <div className="flex items-center gap-3 ml-auto">
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <h1 className="hidden sm:block text-sm font-semibold text-gray-700">
              {user?.fullName}
            </h1>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 min-h-[80vh]">
            {(() => {
              switch (active) {
                case "Dashboard":
                  return <Dashboard />;
                case "Add Project":
                  return <AddProject />;
                case "Add Skill":
                  return <AddSkill />;
                case "Add Application":
                  return <AddApplication />;
                case "Add Timeline":
                  return <AddTimeline />;
                case "Messages":
                  return <Messages />;
                case "Account":
                  return <Account />;
                default:
                  return <Dashboard />;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;