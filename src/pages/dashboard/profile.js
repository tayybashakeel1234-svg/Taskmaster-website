"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(storedUser);
      parsed.id = Number(parsed.id); // ensure number
      setUser(parsed);
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        const query = `
          query GetTasks($user_id: Int!) {
            tasks(user_id: $user_id) {
              id
              title
              status
              due_date
            }
          }
        `;

        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: { user_id: user.id },
          }),
        });

        const json = await res.json();

        if (json.errors) {
          console.error("GraphQL Errors:", json.errors);
          setTasks([]);
        } else if (json.data && Array.isArray(json.data.tasks)) {
          setTasks(json.data.tasks);
        } else {
          console.warn("Unexpected GraphQL response:", json);
          setTasks([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  if (!user) return null;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#10B981", "#F59E0B"], // green & yellow
        hoverBackgroundColor: ["#059669", "#D97706"],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex pt-24 min-h-screen bg-gray-100">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Info */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 flex items-center justify-center text-4xl font-bold text-gray-500">
                {user.full_name.charAt(0)}
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-800">{user.full_name}</h1>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <p className="text-gray-400 text-sm mb-6">User ID: {user.id}</p>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Logout
              </button>
            </div>

            {/* Task Stats & Chart */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
              {loading ? (
                <p className="text-gray-500">Loading tasks...</p>
              ) : totalTasks > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Statistics</h2>

                  <div className="w-64 mb-6">
                    <Pie data={chartData} />
                  </div>

                  <div className="flex justify-around w-full mt-4">
                    <div className="text-center">
                      <p className="text-gray-500">Total Tasks</p>
                      <p className="text-xl font-bold text-gray-800">{totalTasks}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Completed</p>
                      <p className="text-xl font-bold text-green-600">{completedTasks}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Pending</p>
                      <p className="text-xl font-bold text-yellow-600">{pendingTasks}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No tasks found for your account.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}