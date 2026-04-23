import React from "react";
import { useSelector } from "react-redux";
import {
  FolderKanban,
  Award,
  Clock3,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { timeline } = useSelector((state) => state.timeline);

  const barData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 75 },
    { name: "May", value: 95 },
  ];

  const pieData = [
    { name: "Projects", value: projects?.length || 0 },
    { name: "Skills", value: skills?.length || 0 },
    { name: "Timeline", value: timeline?.length || 0 },
  ];

  const lineData = [
    { month: "Jan", users: 10 },
    { month: "Feb", users: 22 },
    { month: "Mar", users: 38 },
    { month: "Apr", users: 60 },
    { month: "May", users: 85 },
  ];

  const colors = ["#6366f1", "#06b6d4", "#22c55e"];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-2 md:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Premium Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, {user?.fullName || "Admin"} 👋
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
          <FolderKanban size={24} />
          <h2 className="text-4xl font-bold mt-3">
            {projects?.length || 0}
          </h2>
          <p className="text-sm text-white/80">Projects</p>
        </div>

        <div className="rounded-2xl p-5 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
          <Award size={24} />
          <h2 className="text-4xl font-bold mt-3">
            {skills?.length || 0}
          </h2>
          <p className="text-sm text-white/80">Skills</p>
        </div>

        <div className="rounded-2xl p-5 bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg">
          <Clock3 size={24} />
          <h2 className="text-4xl font-bold mt-3">
            {timeline?.length || 0}
          </h2>
          <p className="text-sm text-white/80">Timeline</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        {/* BAR */}
        <div className="bg-[#131c31] rounded-2xl p-4 shadow-lg">
          <h2 className="mb-3 font-semibold">Growth Report</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-[#131c31] rounded-2xl p-4 shadow-lg">
          <h2 className="mb-3 font-semibold">Portfolio Ratio</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((item, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {/* Skill Progress */}
        <div className="bg-[#131c31] rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold mb-4 flex gap-2 items-center">
            <Star size={18} /> Skill Progress
          </h2>

          {skills?.length > 0 ? (
            skills.slice(0, 5).map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.title}</span>
                  <span>{item.proficiency}%</span>
                </div>

                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{ width: `${item.proficiency}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No Skills Added</p>
          )}
        </div>

        {/* LINE CHART */}
        <div className="bg-[#131c31] rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold mb-4 flex gap-2 items-center">
            <TrendingUp size={18} /> Visitor Growth
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;