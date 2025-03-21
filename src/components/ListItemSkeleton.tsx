function SkeltonItem() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-md animate-pulse">
      <div className="h-7 bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}

export default function ListItemSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 10 }).map((_, idx) => (
        <SkeltonItem key={idx} />
      ))}
    </div>
  );
}
