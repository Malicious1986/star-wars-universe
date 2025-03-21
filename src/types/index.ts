export type Film = {
  title: string;
  url: string;
};

export type Character = {
  name: string;
  homeworld: string;
  url: string;
};

export type Starship = {
  name: string;
  model: string;
  url: string;
};

export type StarshipDetails = {
  name: string;
  model: string;
  crew: string;
  films: string[];
};

export type Planet = {
  name: string;
  population: string;
  url: string;
};

export type PlanetDetails = {
  name: string;
  population: string;
  climate: string;
  films: string[];
  residents: string[];
};

export type Resident = {
  name: string;
  url: string;
};
