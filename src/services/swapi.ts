import axios from "axios";
import { createMemoizedFetcher } from "../utils/memoizedFetch";

const BASE_URL = "https://swapi.dev/api/";

export const fetchPlanets = createMemoizedFetcher(
  async (page = 1, search = "") => {
    const res = await axios.get(`${BASE_URL}planets/`, {
      params: { page, search },
    });
    return res.data;
  }
);

export const fetchPlanetById = createMemoizedFetcher(async (id: string) => {
  const res = await axios.get(`${BASE_URL}planets/${id}/`);
  return res.data;
});

export const fetchResourceByUrl = createMemoizedFetcher(async (url: string) => {
  const res = await axios.get(url);
  return res.data;
});

export const fetchCharacters = createMemoizedFetcher(
  async (page = 1, search = "") => {
    const res = await axios.get(`${BASE_URL}people/`, {
      params: { page, search },
    });
    return res.data;
  }
);

export const fetchPlanetNameByUrl = createMemoizedFetcher(
  async (url: string): Promise<string> => {
    const res = await axios.get(url);
    return res.data.name;
  }
);

export const fetchCharacterById = createMemoizedFetcher(async (id: string) => {
  const res = await axios.get(`${BASE_URL}people/${id}/`);
  return res.data;
});

export const fetchStarships = createMemoizedFetcher(
  async (page = 1, search = "") => {
    const res = await axios.get(`${BASE_URL}starships/`, {
      params: { page, search },
    });
    return res.data;
  }
);

export const fetchStarshipById = createMemoizedFetcher(async (id: string) => {
  const res = await axios.get(`${BASE_URL}starships/${id}/`);
  return res.data;
});
