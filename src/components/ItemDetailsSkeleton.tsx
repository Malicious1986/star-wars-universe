export default function ItemDetailsSkeleton() {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-md text-white mx-auto animate-pulse">
      <div className="h-8 bg-gray-600 rounded w-1/3 mb-6"></div>

      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      </div>

      <div className="mb-6">
        <div className="h-5 bg-gray-600 rounded w-1/4 mb-3"></div>
        <ul className="space-y-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <li key={idx} className="h-4 bg-gray-600 rounded w-2/3"></li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <div className="h-5 bg-gray-600 rounded w-1/4 mb-3"></div>
        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li key={idx} className="h-4 bg-gray-600 rounded w-1/2"></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
