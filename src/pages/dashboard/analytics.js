"use client";

import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const query = `
          query GetTasks($user_id: Int!) {
            tasks(user_id: $user_id) {
              id
              title
              status
            }
          }
        `;
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables: { user_id: Number(user.id) } }),
        });

        const json = await res.json();
        setTasks(json?.data?.tasks || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
        backgroundColor: ["#10B981", "#F59E0B"],
      },
    ],
  };

  const barData = {
    labels: ["Total", "Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [total, completed, pending],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex pt-24 min-h-screen bg-gray-100">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Analytics</h1>

          {loading ? (
            <p>Loading...</p>
          ) : total === 0 ? (
            <p>No tasks found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4">Task Distribution</h2>
                <Pie data={pieData} className="max-w-xs" />
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4">Task Overview</h2>
                <Bar data={barData} className="max-w-xs" />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}