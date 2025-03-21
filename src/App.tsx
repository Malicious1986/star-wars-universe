import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PlanetsList from "./pages/PlanetsList";
import PlanetDetail from "./pages/PlanetDetail";
import CharactersList from "./pages/CharactersList";
import CharacterDetail from "./pages/CharacterDetail";
import StarshipsList from "./pages/StarshipsList";
import StarshipDetail from "./pages/StarshipDetail";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/planets" />} />
          <Route path="/planets" element={<PlanetsList />} />
          <Route path="/planet/:id" element={<PlanetDetail />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/starships" element={<StarshipsList />} />
          <Route path="/starship/:id" element={<StarshipDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
