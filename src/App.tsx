import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PlanetsList from "./pages/PlanetsList";
import { Suspense } from "react";
import React from "react";

const PlanetDetail = React.lazy(() => import("./pages/PlanetDetail"));
const CharactersList = React.lazy(() => import("./pages/CharactersList"));
const CharacterDetail = React.lazy(() => import("./pages/CharacterDetail"));
const StarshipsList = React.lazy(() => import("./pages/StarshipsList"));
const StarshipDetail = React.lazy(() => import("./pages/StarshipDetail"));

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/planets" />} />
            <Route path="/planets" element={<PlanetsList />} />
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/characters" element={<CharactersList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/starships" element={<StarshipsList />} />
            <Route path="/starship/:id" element={<StarshipDetail />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
