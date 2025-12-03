import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Utils/axios";

export default function Sidebar({ active }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      try {

        const token = localStorage.getItem("token");
        if (!token) return;
        
        // Busca generos 
        const response = await axios.get(`/movies/genres`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;

        setCategories(data.genres || []);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
      }
    }

    loadGenres();
  }, []);

  return (
    <aside className="w-64 bg-white shadow-lg p-4 h-screen sticky top-0 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Gêneros</h2>

      <nav className="flex flex-col gap-2">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/dashboard?genre=${cat.id}`}
            className={`px-3 py-2 rounded-lg text-sm ${
              active === String(cat.id)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
