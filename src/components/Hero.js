"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 pt-40 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">


        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Stay Organized. <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Achieve More.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            TaskMaster helps you manage tasks, collaborate with teams,
            and boost productivity — all in one powerful platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            
            {/* Get Started Free → Signup */}
            <Link href="/signup">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
                Get Started Free
              </button>
            </Link>

            {/* Watch Demo */}
            <button className="px-8 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition">
              Watch Demo
            </button>

          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
           src="/laptop.png"
            alt="Task Dashboard"
            className="rounded-2xl shadow-2xl border"
          />
        </motion.div>

      </div>
    </section>
  );
}