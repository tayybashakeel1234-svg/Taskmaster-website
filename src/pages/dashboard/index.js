"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardCard from "../../components/DashboardCard";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);
    parsed.id = Number(parsed.id); // 🔥 ensure number
    setUser(parsed);
    fetchTasks(parsed.id);
  }, []);

  const fetchTasks = async (userId) => {
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
        variables: { user_id: Number(userId) },
      }),
    });

    const data = await res.json();

    if (data.errors) {
      console.error("Dashboard Fetch Error:", data.errors);
      return;
    }

    if (data.data) {
      setTasks(data.data.tasks);
    }
  };

  if (!user) return null;

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  return (
    <>
      <Navbar />

      <div className="flex pt-24 min-h-screen bg-gray-100">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user.full_name}
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Tasks" count={total} />
            <DashboardCard title="Completed Tasks" count={completed} />
            <DashboardCard title="Pending Tasks" count={pending} />
          </div>

          {/* Tasks Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="p-2 border">{task.title}</td>

                    <td className="p-2 border">
                      {task.status === "completed" ? (
                        <span className="text-green-600 font-semibold">
                          Completed
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-2 border">
                      {task.due_date
                        ? new Date(Number(task.due_date)).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

