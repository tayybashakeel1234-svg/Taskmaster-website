"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiCheckSquare,
  FiUser,
  FiLogOut,
  FiBarChart2,
  FiSettings,
  FiBell
} from "react-icons/fi";

export default function DashboardSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed
        top-16
        left-0
        h-[calc(100vh-4rem)]
        bg-white
        shadow-lg
        transition-all
        duration-300
        overflow-hidden
        z-30
        ${isHovered ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col h-full py-6 justify-between">

        {/* Navigation */}
        <nav className="flex flex-col items-center space-y-6 text-gray-700">
          <SidebarLink href="/dashboard" icon={<FiHome size={22} />} label="Dashboard" show={isHovered} />
          <SidebarLink href="/dashboard/tasks" icon={<FiCheckSquare size={22} />} label="Tasks" show={isHovered} />
          <SidebarLink href="/dashboard/profile" icon={<FiUser size={22} />} label="Profile" show={isHovered} />
          <SidebarLink href="/dashboard/analytics" icon={<FiBarChart2 size={22} />} label="Analytics" show={isHovered} />
          <SidebarLink href="/dashboard/notifications" icon={<FiBell size={22} />} label="Notifications" show={isHovered} />
          <SidebarLink href="/dashboard/settings" icon={<FiSettings size={22} />} label="Settings" show={isHovered} />
        </nav>

        {/* Logout */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className={`flex items-center gap-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${
              isHovered ? "justify-start w-48" : "justify-center w-12"
            }`}
          >
            <FiLogOut size={19} />
            {isHovered && <span>Sign Out</span>}
          </button>
        </div>

      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label, show }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center
        ${show ? "justify-start px-6 w-full" : "justify-center w-12"}
        py-3
        rounded-lg
        hover:bg-blue-50
        hover:text-blue-600
        transition
      `}
    >
      {icon}
      {show && <span className="ml-3 text-sm font-medium">{label}</span>}
    </Link>
  );
}