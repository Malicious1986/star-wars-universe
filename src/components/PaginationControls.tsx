type PaginationControlsProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PaginationControls({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`p-3 rounded-xl border border-gray-600 transition ${
          hasPrevious
            ? "bg-gray-800 text-white hover:bg-yellow-400 hover:text-black"
            : "opacity-50 cursor-not-allowed bg-gray-700"
        }`}
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`p-3 rounded-xl border border-gray-600 transition ${
          hasNext
            ? "bg-gray-800 text-white hover:bg-yellow-400 hover:text-black"
            : "opacity-50 cursor-not-allowed bg-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
