export default function DashboardCard({ title, count, color }) {
  return (
    <div
      className={`rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300 ${color}`}
    >
      <h3 className="text-lg opacity-80">{title}</h3>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  );
}