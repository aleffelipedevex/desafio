import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Main from "../Components/Main";
import Paginate from "../Components/Paginate";
import Search from "../Components/Search";
import axios from "../Utils/axios";

export default function Dashboard() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedGenre = params.get("genre");

  const load = async (page = 1, query = "", genre = null) => {
    try {
      const token = localStorage.getItem("token");

      let endpoint = "";

      if (query) {
        endpoint = `/movies/search?q=${query}&page=${page}`;
      } else if (genre) {
        endpoint = `/movies/discover?genre=${genre}&page=${page}`;
      } else {
        endpoint = `/movies/popular?page=${page}`;
      }

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalPages(res.data.total_pages || 1);

      const moviesList = res.data.results.map((m) => ({
        id: m.id,
        title: m.title,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        description: m.overview,
      }));

      setMovies(moviesList);
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
  };

  useEffect(() => {
    load(currentPage, search, selectedGenre);
  }, [currentPage, search, selectedGenre]);

  return (
    <>
      <Main />

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="w-full p-6">

          <Search
            value={search}
            onChange={(text) => {
              setCurrentPage(1);
              setSearch(text);
            }}
          />
         
          {/* Lista */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={movie.poster}
                  className="w-full h-60 object-cover"
                  alt={movie.title}
                />

                <div className="p-4">
                  <h3 className="font-semibold">{movie.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {movies.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Nenhum filme encontrado.
            </p>
          )}

          {/* PAGINAÇÃO */}
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>
      </div>
    </>
  );
}
