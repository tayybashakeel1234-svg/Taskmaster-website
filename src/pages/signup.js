
// "use client"; // Needed for React hooks in Next.js 16+

// import { useState } from "react";
// import { useRouter } from "next/router";
// import Navbar from "../components/Navbar";
// import Link from "next/link";
// import { supabase } from "../lib/supabaseClient";

// export default function Signup() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const fullName = e.target.fullName.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const confirm = e.target.confirm.value;

//     if (password !== confirm) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Create user in Supabase Auth
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: { full_name: fullName }, // Store full name in user metadata
//         },
//       });

//       if (error) {
//         setError(error.message);
//       } else {
//         // Signup successful → redirect to login
//         router.push("/login");
//       }
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
//         <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">

//           {/* Heading */}
//           <div className="text-center mb-5">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Create Account
//             </h2>
//             <p className="text-gray-500 text-sm mt-2">
//               Join TaskMaster and boost your productivity
//             </p>
//           </div>

//           {/* Error message */}
//           {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

//           <form onSubmit={handleSignup}>
            
//             {/* Full Name */}
//             <div className="mb-2">
//               <label className="block text-sm text-gray-700 mb-2">Full Name</label>
//               <input
//                 name="fullName"
//                 type="text"
//                 required
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//               />
//             </div>

//             {/* Email */}
//             <div className="mb-5">
//               <label className="block text-sm text-gray-700 mb-2">Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-5">
//               <label className="block text-sm text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   placeholder="Create a password"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-sm text-gray-500"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="mb-3">
//               <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   name="confirm"
//                   type={showConfirm ? "text" : "password"}
//                   required
//                   placeholder="Confirm your password"
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-3 text-sm text-gray-500"
//                 >
//                   {showConfirm ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-center mb-6 text-sm text-gray-600">
//               <input type="checkbox" required className="mr-2 accent-blue-600" />
//               I agree to the Terms & Conditions
//             </div>

//             {/* Sign Up Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               {loading ? "Creating Account..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Login Redirect */}
//           <p className="text-center text-gray-600 text-sm mt-6">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 font-semibold hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const mutation = `
        mutation Signup($full_name: String!, $email: String!, $password: String!) {
          signup(full_name: $full_name, email: $email, password: $password) {
            id
            email
          }
        }
      `;

      const variables = { full_name: fullName, email, password };

      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const data = await res.json();

      if (data.errors) {
        setError(data.errors[0].message);
      } else {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/login"); // smooth redirect after toast
        }, 1000);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">

          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Join TaskMaster and boost your productivity
            </p>
          </div>

          {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

          <form onSubmit={handleSignup}>
            {/* Full Name, Email, Password, Confirm Password fields remain same */}
            <div className="mb-2">
              <label className="block text-sm text-gray-700 mb-2">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-sm text-gray-500"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6 text-sm text-gray-600">
              <input type="checkbox" required className="mr-2 accent-blue-600" />
              I agree to the Terms & Conditions
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}