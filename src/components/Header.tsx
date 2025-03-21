import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-md rounded-b-2xl p-4 mb-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-white tracking-widest">
          Star Wars Explorer
        </h1>
        <nav className="flex gap-6">
          <NavLink
            to="/planets"
            className={({ isActive }) =>
              `text-gray-300 hover:text-yellow-400 text-lg font-semibold ${
                isActive ? "text-yellow-400 underline" : ""
              }`
            }
          >
            Planets
          </NavLink>
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              `text-gray-300 hover:text-yellow-400 text-lg font-semibold ${
                isActive ? "text-yellow-400 underline" : ""
              }`
            }
          >
            Characters
          </NavLink>
          <NavLink
            to="/starships"
            className={({ isActive }) =>
              `text-gray-300 hover:text-yellow-400 text-lg font-semibold ${
                isActive ? "text-yellow-400 underline" : ""
              }`
            }
          >
            Starships
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
