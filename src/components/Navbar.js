"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect after logout
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition duration-300">
            TaskMaster
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition duration-300">Home</Link>
          <Link href="/features" className="hover:text-blue-600 transition duration-300">Features</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition duration-300">Pricing</Link>
          <Link href="/about" className="hover:text-blue-600 transition duration-300">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition duration-300">Contact</Link>
          {user && (
            <Link href="/dashboard" className="hover:text-blue-600 transition duration-300">
              Dashboard
            </Link>
          )}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="px-5 py-2 rounded-lg border border-red-600 text-red-600 font-medium hover:bg-red-50 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition duration-300"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}