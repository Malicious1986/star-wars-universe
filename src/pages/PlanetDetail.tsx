import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPlanetById, fetchResourceByUrl } from "../services/swapi";
import ItemDetailsSkeleton from "../components/ItemDetailsSkeleton";
import ItemDetailContainer from "../components/ItemDetailContainer";
import DetailListSection from "../components/DetailListSection";
import { Film, PlanetDetails, Resident } from "../types";

export default function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState<PlanetDetails | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlanetDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPlanetById(id!);
        setPlanet(data);

        const filmsData = await Promise.all(
          data.films.map((url: string) => fetchResourceByUrl(url))
        );
        setFilms(filmsData);

        const residentsData = await Promise.all(
          data.residents.map((url: string) => fetchResourceByUrl(url))
        );
        setResidents(residentsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load planet details.");
      } finally {
        setLoading(false);
      }
    };

    loadPlanetDetails();
  }, [id]);

  if (loading) return <ItemDetailsSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!planet) return null;

  return (
    <ItemDetailContainer backPath="/planets" title={planet.name}>
      <p className="mb-2">
        <span className="font-semibold">Population:</span> {planet.population}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Climate:</span> {planet.climate}
      </p>
      <DetailListSection
        title="Movies"
        items={films.map((film) => ({
          id: film.url,
          content: <span className="text-yellow-400">{film.title}</span>,
        }))}
        emptyMessage="No movies listed."
      />

      <DetailListSection
        title="Residents"
        items={residents.map((resident) => {
          const residentId = resident.url.split("/").filter(Boolean).pop();
          return {
            id: residentId!,
            content: (
              <Link
                to={`/character/${residentId}`}
                className="text-yellow-400 underline"
              >
                {resident.name}
              </Link>
            ),
          };
        })}
        emptyMessage="No known residents."
      />
    </ItemDetailContainer>
  );
}
