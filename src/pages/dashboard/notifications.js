"use client";

import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    // Placeholder: you can fetch real notifications from your DB
    const mockNotifications = [
      { id: 1, message: "TaskMaster helps you manage tasks, collaborate with teams, and boost productivity — all in one powerful platform.", type: "success" },
      { id: 2, message: "New task assigned", type: "info" },
      { id: 3, message: "Warning msg", type: "warning" },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex pt-35 p-20 min-h-screen bg-gray-100">
        <DashboardSidebar />
        {/* <main className="flex-1 p-6 overflow-auto"> */}
         <main className="flex-1 ml-16  px-6">
          <h1 className="text-3xl font-bold mb-6">Notifications</h1>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
            {notifications.length === 0 ? (
              <p>No notifications found</p>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-4 rounded-lg shadow-sm ${
                    n.type === "success"
                      ? "bg-green-50 text-green-700"
                      : n.type === "warning"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {n.message}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}