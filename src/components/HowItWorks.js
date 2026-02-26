
export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">How It Works</h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold">1. Create Tasks</h3>
            <p className="mt-4 text-gray-600">
              Add tasks and organize them into projects.
            </p>
          </div>


          <div>
            <h3 className="text-xl font-semibold">2. Collaborate</h3>
            <p className="mt-4 text-gray-600">
              Assign tasks and work together in real-time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Achieve Goals</h3>
            <p className="mt-4 text-gray-600">
              Track progress and hit your milestones faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}