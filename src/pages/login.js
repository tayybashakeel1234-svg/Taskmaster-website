// "use client"; // Required for hooks in Next.js 16+

// import { useState } from "react";
// import { useRouter } from "next/router";
// import Navbar from "../components/Navbar";
// import Link from "next/link";
// import { supabase } from "../lib/supabaseClient"; // Make sure this path is correct

// export default function Login() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(""); // For showing auth errors

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//     } else {
//       router.push("/dashboard"); // Redirect on successful login
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
//         <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">

//           {/* Heading */}
//           <div className="text-center mb-5">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Welcome Back
//             </h2>
//             <p className="text-gray-500 text-sm mt-2">
//               Sign in to continue to TaskMaster
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

//           <form onSubmit={handleLogin}>
            
//             {/* Email */}
//             <div className="mb-3">
//               <label className="block text-sm text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-3">
//               <label className="block text-sm text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   placeholder="Enter your password"
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

//             {/* Remember + Forgot */}
//             <div className="flex justify-between items-center mb-6 text-sm">
//               <label className="flex items-center text-gray-600">
//                 <input type="checkbox" className="mr-2 accent-blue-600" />
//                 Remember me
//               </label>

//               <Link
//                 href="/forgot-password"
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Sign In */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center">
//             <div className="flex-grow h-px bg-gray-200"></div>
//             <span className="px-3 text-gray-400 text-sm">OR</span>
//             <div className="flex-grow h-px bg-gray-200"></div>
//           </div>

//           {/* Social Buttons */}
//           <div className="space-y-1.5">
//             <button className="w-full border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition shadow-sm">
//               Continue with Google
//             </button>

//             <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:opacity-90 transition shadow-sm">
//               Continue with GitHub
//             </button>
//           </div>

//           {/* Signup */}
//           <p className="text-center text-gray-600 text-sm mt-6">
//             Don’t have an account?{" "}
//             <Link
//               href="/signup"
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Sign up
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

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const mutation = `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            id
            full_name
            email
          }
        }
      `;

      const variables = { email, password };

      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const data = await res.json();

      if (data.errors || !data.data.login) {
        setError("Invalid email or password.");
      } else {
        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.data.login));
        toast.success("Logged in successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
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
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue to TaskMaster
            </p>
          </div>

          {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
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

            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 accent-blue-600" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <div className="space-y-1.5">
            <button className="w-full border border-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition shadow-sm">
              Continue with Google
            </button>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:opacity-90 transition shadow-sm">
              Continue with GitHub
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}