import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStarshipById, fetchResourceByUrl } from "../services/swapi";
import ItemDetailsSkeleton from "../components/ItemDetailsSkeleton";
import ItemDetailContainer from "../components/ItemDetailContainer";
import DetailListSection from "../components/DetailListSection";
import { Film, StarshipDetails } from "../types";

export default function StarshipDetail() {
  const { id } = useParams();
  const [starship, setStarship] = useState<StarshipDetails | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStarshipDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchStarshipById(id!);
        setStarship(data);

        const filmsData = await Promise.all(
          data.films.map((url: string) => fetchResourceByUrl(url))
        );
        setFilms(filmsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load starship details.");
      } finally {
        setLoading(false);
      }
    };

    loadStarshipDetails();
  }, [id]);

  if (loading) return <ItemDetailsSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!starship) return null;

  return (
    <ItemDetailContainer backPath="/starships" title={starship.name}>
      <p className="mb-2">
        <span className="font-semibold">Model:</span> {starship.model}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Crew:</span> {starship.crew}
      </p>

      <DetailListSection
        title="Movies"
        items={films.map((film) => ({
          id: film.url,
          content: <span className="text-yellow-400">{film.title}</span>,
        }))}
        emptyMessage="No movies listed."
      />
    </ItemDetailContainer>
  );
}
