import { useEffect, useState } from "react";
import { fetchStarships } from "../services/swapi";
import ListItemSkeleton from "../components/ListItemSkeleton";
import ListControls from "../components/ListControls";
import PaginationControls from "../components/PaginationControls";
import { Starship } from "../types";
import ItemCard from "../components/ItemCard";
import { useListControls } from "../hooks/useListControls";
import { sortByField } from "../utils/sortUtils";

export default function StarshipsList() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    query,
    sortField,
    sortOrder,
    handleSortChange,
    page,
    setPage,
    debouncedSearch,
    resetSearch,
  } = useListControls("name");

  useEffect(() => {
    const loadStarships = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchStarships(page, query);
        setStarships(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch starships.");
      } finally {
        setLoading(false);
      }
    };

    loadStarships();
  }, [page, query]);

  const sortedStarships = sortByField(starships, sortField, sortOrder);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Starships</h2>

      <ListControls
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          debouncedSearch(value);
        }}
        onResetSearch={resetSearch}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        sortOptions={[
          { field: "name", label: "Name" },
          { field: "model", label: "Model" },
        ]}
        searchPlaceholder="Search starships..."
      />

      {loading && <ListItemSkeleton />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStarships.map((ship) => {
            const shipId = ship.url.split("/").filter(Boolean).pop();
            return (
              <ItemCard
                key={shipId}
                id={shipId!}
                label="Model"
                routePrefix="starship"
                title={ship.name}
                value={ship.model}
              />
            );
          })}
        </div>
      )}

      <PaginationControls
        hasPrevious={!!prevPage}
        hasNext={!!nextPage}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </section>
  );
}
