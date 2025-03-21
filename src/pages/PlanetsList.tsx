import { useEffect, useState } from "react";
import { fetchPlanets } from "../services/swapi";
import ListItemSkeleton from "../components/ListItemSkeleton";
import ListControls from "../components/ListControls";
import PaginationControls from "../components/PaginationControls";
import { Planet } from "../types";
import ItemCard from "../components/ItemCard";
import { useListControls } from "../hooks/useListControls";
import { sortByField } from "../utils/sortUtils";

export default function PlanetsList() {
  const [planets, setPlanets] = useState<Planet[]>([]);
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
    const loadPlanets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchPlanets(page, query);
        setPlanets(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch planets.");
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, [page, query]);

  const sortedPlanets = sortByField(
    planets,
    sortField,
    sortOrder,
    (item, field) =>
      field === "population"
        ? parseInt(item.population.replace(/,/g, "")) || 0
        : item.name.toLowerCase()
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Planets</h2>

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
          { field: "population", label: "Population" },
        ]}
        searchPlaceholder="Search planets..."
      />

      {loading && <ListItemSkeleton />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlanets.map((planet) => {
            const planetId = planet.url.split("/").filter(Boolean).pop();
            return (
              <ItemCard
                key={planetId}
                id={planetId!}
                label="Population"
                routePrefix="planet"
                title={planet.name}
                value={planet.population}
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
