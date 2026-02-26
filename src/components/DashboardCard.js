export default function DashboardCard({ title, count }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{count}</p>
    </div>
  );
}