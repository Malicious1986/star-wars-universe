import { useEffect, useState } from "react";
import { fetchCharacters, fetchPlanetNameByUrl } from "../services/swapi";
import ListItemSkeleton from "../components/ListItemSkeleton";
import ListControls from "../components/ListControls";
import PaginationControls from "../components/PaginationControls";
import { Character } from "../types";
import ItemCard from "../components/ItemCard";
import { useListControls } from "../hooks/useListControls";
import { sortByField } from "../utils/sortUtils";

export default function CharactersList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [homeworlds, setHomeworlds] = useState<Record<string, string>>({});
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
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError("");
        setHomeworlds({});

        const data = await fetchCharacters(page, query);
        setCharacters(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);

        const homeworldData: Record<string, string> = {};
        await Promise.all(
          data.results.map(async (char: Character) => {
            const name = await fetchPlanetNameByUrl(char.homeworld);
            homeworldData[char.url] = name;
          })
        );
        setHomeworlds(homeworldData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch characters.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page, query]);

  const sortedCharacters = sortByField(
    characters,
    sortField,
    sortOrder,
    (item, field) =>
      field === "homeworld"
        ? homeworlds[item.url]?.toLowerCase() || ""
        : item.name.toLowerCase()
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Characters</h2>

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
          { field: "homeworld", label: "Homeworld" },
        ]}
        searchPlaceholder="Search characters..."
      />

      {loading && <ListItemSkeleton />}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCharacters.map((char) => {
            const charId = char.url.split("/").filter(Boolean).pop();
            return (
              <ItemCard
                key={charId}
                id={charId!}
                label="Homeworld"
                routePrefix="character"
                title={char.name}
                value={homeworlds[char.url] || "Loading..."}
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
