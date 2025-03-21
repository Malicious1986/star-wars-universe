import { ChangeEvent } from "react";

type SortOption = {
  field: string;
  label: string;
};

type ListControlsProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onResetSearch: () => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
  sortOptions: SortOption[];
  searchPlaceholder: string;
};

export default function ListControls({
  searchTerm,
  onSearchChange,
  onResetSearch,
  sortField,
  sortOrder,
  onSortChange,
  sortOptions,
  searchPlaceholder,
}: ListControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="bg-gray-800 text-white border border-gray-600 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition pr-10"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
        />
        {searchTerm && (
          <button
            onClick={onResetSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <label className="font-semibold text-white">Sort by:</label>
        {sortOptions.map((option) => (
          <button
            key={option.field}
            className={`p-2 rounded-xl border border-gray-600 transition ${
              sortField === option.field
                ? "bg-yellow-400 text-black font-bold"
                : "bg-gray-800 text-white"
            } hover:bg-yellow-400 hover:text-black`}
            onClick={() => onSortChange(option.field)}
          >
            {option.label}{" "}
            {sortField === option.field && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        ))}
      </div>
    </div>
  );
}
