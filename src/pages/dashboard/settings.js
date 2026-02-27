"use client";

import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useState } from "react";

export default function Settings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [fullName, setFullName] = useState(user.full_name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSave = () => {
    // Save to localStorage or send to backend
    const updatedUser = { ...user, full_name: fullName, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Settings updated successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="flex pt-35 p-15 min-h-screen bg-gray-100">
        <DashboardSidebar />
        {/* <main className="flex-1 p-6 overflow-auto"> */}
         <main className="flex-1 ml-16  px-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                onClick={handleSave}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}