import Layout from "../components/Layout";
import Link from "next/link";

export default function Pricing() {
  return (
    <Layout>
      <div className="pt-32 pb-24 bg-gradient-to-br from-blue-50 to-white text-center px-6">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Simple & Transparent Pricing
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Choose the plan that fits your workflow. Upgrade anytime as your
          productivity grows.
        </p>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">

          {/* Free Plan */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200 w-80 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Free
            </h3>

            <p className="text-4xl font-bold mb-6 text-gray-900">
              $0
              <span className="text-base font-medium text-gray-500">
                /month
              </span>
            </p>

            <ul className="text-gray-600 space-y-3 mb-8 text-sm">
              <li>✔️ Basic Task Management</li>
              <li>✔️ Up to 5 Projects</li>
              <li>✔️ Community Support</li>
            </ul>

            <Link
              href="/signup"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white p-10 rounded-2xl shadow-xl border-2 border-blue-600 w-80 hover:shadow-2xl transition duration-300 scale-105">

            {/* Popular Badge */}
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
              Most Popular
            </span>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Pro
            </h3>

            <p className="text-4xl font-bold mb-6 text-gray-900">
              $9
              <span className="text-base font-medium text-gray-500">
                /month
              </span>
            </p>

            <ul className="text-gray-600 space-y-3 mb-8 text-sm">
              <li>✔️ Unlimited Projects</li>
              <li>✔️ Advanced Analytics</li>
              <li>✔️ Priority Support</li>
              <li>✔️ Team Collaboration</li>
            </ul>

            <Link
              href="/signup"
              className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Upgrade Now
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
}