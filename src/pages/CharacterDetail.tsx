import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterById, fetchResourceByUrl } from "../services/swapi";
import ItemDetailsSkeleton from "../components/ItemDetailsSkeleton";
import ItemDetailContainer from "../components/ItemDetailContainer";
import DetailListSection from "../components/DetailListSection";
import { Character, Film, Planet, Starship } from "../types";

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCharacterDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterById(id!);
        setCharacter(data);

        const hw = await fetchResourceByUrl(data.homeworld);
        setHomeworld(hw);

        const filmsData = await Promise.all(
          data.films.map((url: string) => fetchResourceByUrl(url))
        );
        setFilms(filmsData);

        const starshipsData = await Promise.all(
          data.starships.map((url: string) => fetchResourceByUrl(url))
        );
        setStarships(starshipsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load character details.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacterDetails();
  }, [id]);

  if (loading) return <ItemDetailsSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!character) return null;

  return (
    <ItemDetailContainer backPath="/characters" title={character.name}>
      <p className="mb-4">
        <span className="font-semibold">Homeworld:</span>{" "}
        {homeworld ? (
          <Link
            to={`/planet/${homeworld.url.split("/").filter(Boolean).pop()}`}
            className="text-yellow-400 hover:underline"
          >
            {homeworld.name}
          </Link>
        ) : (
          "Loading..."
        )}
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
        title="Starships"
        items={starships.map((ship) => {
          const shipId = ship.url.split("/").filter(Boolean).pop();
          return {
            id: shipId!,
            content: (
              <Link
                to={`/starship/${shipId}`}
                className="text-yellow-400 underline"
              >
                {ship.name}
              </Link>
            ),
          };
        })}
        emptyMessage="No starships piloted."
      />
    </ItemDetailContainer>
  );
}
