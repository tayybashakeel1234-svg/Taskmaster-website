"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function TasksPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", due_date: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [actionBoxId, setActionBoxId] = useState(null);

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
      body: JSON.stringify({ query, variables: { user_id: Number(userId) } }),
    });
    const data = await res.json();
    if (data.data) {
      setTasks(data.data.tasks);
      setFilteredTasks(data.data.tasks);
    }
  };

  const createTask = async () => {
    if (!form.title || !user) return;

    const mutation = `
      mutation CreateTask($title: String!, $description: String, $due_date: String, $user_id: Int!) {
        createTask(title: $title, description: $description, due_date: $due_date, user_id: $user_id) { id }
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
          user_id: Number(user.id),
        },
      }),
    });

    setForm({ title: "", description: "", due_date: "" });
    setCreateModal(false);
    fetchTasks(user.id);
  };

  const updateTask = async () => {
    if (!modalTask) return;

    const mutation = `
      mutation UpdateTask($id: Int!, $title: String, $description: String, $status: String, $due_date: String) {
        updateTask(id: $id, title: $title, description: $description, status: $status, due_date: $due_date) { id }
      }
    `;

    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          id: Number(modalTask.id),
          title: modalTask.title,
          description: modalTask.description,
          status: modalTask.status,
          due_date: modalTask.due_date || null,
        },
      }),
    });

    setModalTask(null);
    fetchTasks(user.id);
  };

  const deleteTask = async (id) => {
    const mutation = `mutation DeleteTask($id: Int!) { deleteTask(id: $id) }`;
    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: { id: Number(id) } }),
    });
    fetchTasks(user.id);
  };

  const updateStatus = async (id, status) => {
    const mutation = `
      mutation UpdateTask($id: Int!, $status: String!) {
        updateTask(id: $id, status: $status) { id }
      }
    `;
    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: { id: Number(id), status } }),
    });
    fetchTasks(user.id);
  };

  useEffect(() => {
    let filtered = tasks.filter((t) => {
      const term = searchTerm.toLowerCase();
      const formattedDate = t.due_date ? formatDate(t.due_date).toLowerCase() : "";
      return (
        t.title?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term) ||
        t.status?.toLowerCase().includes(term) ||
        formattedDate.includes(term) ||
        String(t.id).includes(term)
      );
    });

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, tasks]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const formatDate = (value) => {
    if (!value) return "N/A";
    let date = !isNaN(value) ? new Date(Number(value)) : new Date(value);
    if (isNaN(date.getTime())) return "N/A";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-26 min-h-screen bg-gray-100">
        <DashboardSidebar />
        <main className="flex-1 ml-16 px-15">

          {/* UI SAME */}

          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Search tasks..." className="border rounded p-2 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <select className="border rounded p-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="mb-4 pt-3">
            <button onClick={() => setCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Create New Task
            </button>
          </div>

          {/* TABLE SAME — unchanged */}
          <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border"></th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="p-2 border">
                      <div className="w-5 h-5 bg-gray-300 rounded cursor-pointer flex items-center justify-center" onClick={() => setActionBoxId(actionBoxId === task.id ? null : task.id)}>▾</div>
                      {actionBoxId === task.id && (
                        <div className="absolute bg-white border rounded shadow p-2 mt-1">
                          {task.status !== "completed" && (
                            <button onClick={() => { updateStatus(task.id, "completed"); setActionBoxId(null); }} className="block w-full text-left px-2 py-1 hover:bg-green-100">
                              Complete
                            </button>
                          )}
                          <button onClick={() => { deleteTask(task.id); setActionBoxId(null); }} className="block w-full text-left px-2 py-1 hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="p-2 border cursor-pointer font-semibold" onClick={() => setModalTask(task)}>
                      {task.title}
                    </td>
                    <td className="p-2 border">{task.description}</td>
                    <td className="p-2 border">
                      <span className={`px-2 py-1 rounded font-semibold ${task.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-2 border">{formatDate(task.due_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

                         {/* PAGINATION — SAME */}
             {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center text-sm">
                <div className="text-gray-600">Page {currentPage} of {totalPages}</div>
                <div className="flex items-center gap-2">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="px-2 py-1 border rounded disabled:opacity-50">{"<<"}</button>
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-2 py-1 border rounded disabled:opacity-50">{"<"}</button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                      {i + 1}
                    </button>
                  ))}

                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-2 py-1 border rounded disabled:opacity-50">{">"}</button>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)} className="px-2 py-1 border rounded disabled:opacity-50">{">>"}</button>
                </div>
              </div>
            )}


          </div>

          {/* UPGRADED FORM ONLY */}
          {(modalTask || createModal) && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-10 rounded-2xl shadow-2xl w-[520px] animate-fadeIn">

                <h2 className="text-2xl font-bold mb-6 text-center">
                  {createModal ? "Create New Task" : "Edit Task"}
                </h2>

                <label className="font-semibold text-gray-700">Task Title *</label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  className="w-full border-2 p-3 rounded-lg mb-4 focus:border-blue-500 outline-none"
                  value={createModal ? form.title : modalTask.title}
                  onChange={(e) =>
                    createModal
                      ? setForm({ ...form, title: e.target.value })
                      : setModalTask({ ...modalTask, title: e.target.value })
                  }
                />

                <label className="font-semibold text-gray-700">Description</label>
                <textarea
                  rows={4}
                  placeholder="Write task details..."
                  className="w-full border-2 p-3 rounded-lg mb-4 focus:border-blue-500 outline-none"
                  value={createModal ? form.description : modalTask.description}
                  onChange={(e) =>
                    createModal
                      ? setForm({ ...form, description: e.target.value })
                      : setModalTask({ ...modalTask, description: e.target.value })
                  }
                />

                <label className="font-semibold text-gray-700">Due Date</label>
                <input
                  type="date"
                  className="w-full border-2 p-3 rounded-lg mb-6 focus:border-blue-500 outline-none"
                  value={createModal ? form.due_date : modalTask.due_date || ""}
                  onChange={(e) =>
                    createModal
                      ? setForm({ ...form, due_date: e.target.value })
                      : setModalTask({ ...modalTask, due_date: e.target.value })
                  }
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setModalTask(null);
                      setCreateModal(false);
                      setForm({ title: "", description: "", due_date: "" });
                    }}
                    className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => (createModal ? createTask() : updateTask())}
                    className={`px-6 py-2 rounded-lg text-white font-semibold ${
                      createModal
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {createModal ? "Create Task" : "Update Task"}
                  </button>
                </div>
              </div>
            </div>
          )}




        </main>
      </div>
    </>
  );
}