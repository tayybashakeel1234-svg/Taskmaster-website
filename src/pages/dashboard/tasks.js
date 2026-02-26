"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function TasksPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);
    parsed.id = Number(parsed.id);
    setUser(parsed);
    fetchTasks(parsed.id);
  }, []);

  const fetchTasks = async (userId) => {
    const query = `
      query GetTasks($user_id: Int!) {
        tasks(user_id: $user_id) {
          id
          title
          description
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
        variables: { user_id: Number(userId) }
      }),
    });

    const data = await res.json();
    if (data.data) setTasks(data.data.tasks);
  };

  const createTask = async () => {
    if (!form.title || !user) return;

    const mutation = `
      mutation CreateTask(
        $title: String!,
        $description: String,
        $due_date: String,
        $user_id: Int!
      ) {
        createTask(
          title: $title,
          description: $description,
          due_date: $due_date,
          user_id: $user_id
        ) {
          id
        }
      }
    `;

    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          title: form.title,
          description: form.description,
          due_date: form.due_date || null,
          user_id: Number(user.id)
        }
      }),
    });

    setForm({ title: "", description: "", due_date: "" });
    fetchTasks(user.id);
  };

  const updateStatus = async (id, status) => {
    const mutation = `
      mutation UpdateTask($id: Int!, $status: String!) {
        updateTask(id: $id, status: $status) {
          id
        }
      }
    `;

    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: { id: Number(id), status } }),
    });

    fetchTasks(user.id);
  };

  const deleteTask = async (id) => {
    const mutation = `
      mutation DeleteTask($id: Int!) {
        deleteTask(id: $id)
      }
    `;

    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: { id: Number(id) } }),
    });

    fetchTasks(user.id);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(Number(timestamp));
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-24 min-h-screen bg-gray-100">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

          {/* CREATE TASK FORM */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

            <div className="mb-3">
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                className="w-full border p-3 rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                placeholder="Enter description"
                className="w-full border p-3 rounded"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1">Due Date</label>
              <input
                type="date"
                className="w-full border p-3 rounded"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>

            <button
              onClick={createTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              Add Task
            </button>
          </div>

          {/* TASK LIST */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Due Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="p-2 border">{task.title}</td>
                    <td className="p-2 border font-semibold">
                      <span
                        className={
                          task.status === "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-2 border">
                      {formatDate(task.due_date)}
                    </td>
                    <td className="p-2 border space-x-2">
                      {task.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(task.id, "completed")}
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm cursor-pointer hover:bg-green-700"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer hover:bg-red-700"
                      >
                        Delete
                      </button>
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