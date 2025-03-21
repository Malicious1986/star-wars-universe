import { Link } from "react-router-dom";

type ItemCardProps = {
  id: string;
  routePrefix: string;
  title: string;
  label: string;
  value: string;
};

export default function ItemCard({
  id,
  routePrefix,
  title,
  label,
  value,
}: ItemCardProps) {
  return (
    <Link
      to={`/${routePrefix}/${id}`}
      className="block bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-[1.02] text-white"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">
        <span className="font-semibold">{label}:</span> {value}
      </p>
    </Link>
  );
}
