import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title) return;
    onAdd({ title, description: "New task added", status: "Pending" });
    setTitle("");
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border px-4 py-3 rounded-xl"
      />
      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-indigo-600"
      >
        Add
      </button>
    </div>
  );
}