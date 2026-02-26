"use client";
import { CheckCircle } from "lucide-react";


export default function FeaturesSection() {
  const features = [
    "Smart Task Planning",
    "Team Collaboration",
    "Real-time Sync",
    "AI Productivity Insights",
    "Cloud Backup",
    "Mobile Friendly",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Powerful Features for Better Productivity
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              <CheckCircle
                className="text-blue-600 mx-auto"
                size={40}
              />
              <h3 className="mt-4 text-xl font-semibold">
                {feature}
              </h3>
              <p className="mt-3 text-gray-600">
                Streamline your workflow and stay ahead with advanced tools.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}