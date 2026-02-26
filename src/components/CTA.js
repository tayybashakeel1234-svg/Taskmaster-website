import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <h2 className="text-4xl font-bold">
        Ready to Boost Your Productivity?
      </h2>
      <p className="mt-4 text-lg opacity-90">
        Join thousands of users managing their tasks smarter.
      </p>

      <Link href="/signup">
        <span className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
          Get Started Now
        </span>
      </Link>
    </section>
  );
}
