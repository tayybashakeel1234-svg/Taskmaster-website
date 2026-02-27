
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
// import DashboardHeader from "../../components/DashboardHeader";
import DashboardCard from "../../components/DashboardCard";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    fetchTasks(parsed.id);
  }, []);

  const fetchTasks = async (userId) => {
    const query = `
      query GetTasks($user_id: Int!) {
        tasks(user_id: $user_id) {
          id
          status
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
    if (data.data) setTasks(data.data.tasks);
  };

  if (!user) return null;

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  return (
    <>
      <Navbar />

       <div className="flex bg-gray-100 pt-16 pb-30">        
        <DashboardSidebar isOpen={sidebarOpen} />

        <div className="flex-1 flex flex-col">

          {/* <DashboardHeader
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          /> */}

          {/* <main className="p-8 flex-1"> */}
          <main className="ml-34 pt-15 px-15">

            <h1 className="text-3xl font-bold mb-8">
              Welcome, {user.full_name}
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <DashboardCard title="Total Tasks" count={total} color="bg-blue-600" />
              <DashboardCard title="Completed" count={completed} color="bg-green-600" />
              <DashboardCard title="Pending" count={pending} color="bg-yellow-500" />
            </div>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <Box title="Tasks" path="/dashboard/tasks" color="border-blue-500" />
              <Box title="Analytics" path="/dashboard/analytics" color="border-green-500" />
              <Box title="Profile" path="/dashboard/profile" color="border-purple-500" />
              <Box title="Settings" path="/dashboard/settings" color="border-yellow-500" />
              <Box title="Notifications" path="/dashboard/notifications" color="border-pink-500" />

            </div>

          </main>
        </div>
      </div>
    </>
  );
}

function Box({ title, path, color }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(path)}
      className={`bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1 border-l-4 ${color}`}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500">Open {title}</p>

    </div>
    
  );
}