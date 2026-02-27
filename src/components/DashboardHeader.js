// "use client";
// import { FiMenu, FiUsers } from "react-icons/fi";
// import { useState, useEffect } from "react";

// export default function DashboardHeader({ onToggleSidebar }) {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showUsers, setShowUsers] = useState(false);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("user"));
//     if (stored) {
//       setCurrentUser(stored);

//       // 🔥 TEMP ADMIN CHECK (later DB role add karenge)
//       if (stored.email === "admin@gmail.com") {
//         fetchUsers();
//       }
//     }
//   }, []);

//   const fetchUsers = async () => {
//     const query = `
//       query {
//         users {
//           id
//           full_name
//           email
//         }
//       }
//     `;

//     const res = await fetch("/api/graphql", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });

//     const data = await res.json();
//     if (data.data) {
//       setUsers(data.data.users);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-30 flex items-center justify-between px-6 py-4">
      
//       {/* Left Side */}
//       <button
//         onClick={onToggleSidebar}
//         className="text-gray-700 hover:text-blue-600 text-xl"
//       >
//         <FiMenu />
//       </button>

//       {/* Right Side */}
//       {currentUser?.email === "admin@gmail.com" && (
//         <div className="relative">
//           <button
//             onClick={() => setShowUsers(!showUsers)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             <FiUsers />
//             Users
//           </button>

//           {showUsers && (
//             <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-56 p-3">
//               {users.map((u) => (
//                 <div
//                   key={u.id}
//                   className="cursor-pointer hover:bg-gray-100 p-2 rounded"
//                   onClick={() => {
//                     localStorage.setItem("selectedUser", JSON.stringify(u));
//                     window.location.reload();
//                   }}
//                 >
//                   {u.full_name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

export default function DashboardHeader({ isOpen, toggleSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  return (
    <header
      className={`fixed top-16 right-0 h-16 bg-white shadow flex items-center justify-between px-6 transition-all duration-300 z-20
        ${isOpen ? "left-64" : "left-16"}`}
    >
      {/* LEFT: Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-blue-600 text-2xl"
      >
        <FiMenu />
      </button>

      {/* RIGHT: Profile */}
      <div className="relative">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer"
        >
          {user?.full_name?.charAt(0)}
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-3 bg-white shadow-lg rounded w-56 p-3">
            <p className="font-semibold">{user?.full_name}</p>
            <p className="text-sm text-gray-500 mb-3">{user?.email}</p>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="w-full text-left text-red-600 hover:bg-gray-100 p-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}