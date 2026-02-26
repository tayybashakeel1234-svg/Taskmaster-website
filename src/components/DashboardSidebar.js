"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiCheckSquare,
  FiUser,
  FiLogOut,
  FiMenu,
  FiBarChart2,
  FiCalendar,
  FiSettings,
  FiBell
} from "react-icons/fi";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        onClick={() => setOpen(!open)}
      >
        <FiMenu size={24} />
      </button>

      <aside
        className={`fixed md:static top-0 left-0 bg-white shadow-lg transition-all duration-300 overflow-hidden z-40 ${
          open ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col h-full p-6 justify-between">
          {/* Links */}
          <nav className="flex flex-col space-y-4 font-medium text-gray-700">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiHome /> Dashboard
            </Link>
            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiCheckSquare /> Tasks
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiUser /> Profile
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiBarChart2 /> Analytics
            </Link>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiBell /> Notifications
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FiSettings /> Settings
            </Link>
          </nav>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="flex items-center justify-center gap-2 mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}