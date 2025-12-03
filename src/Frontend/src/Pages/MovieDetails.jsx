import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "../Components/Main";
import axios from "../Utils/axios";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Busca detalhes 
        const movieRes = await axios.get(`/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Busca créditos 
        const creditRes = await axios.get(`/movies/${id}/credits`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMovie(movieRes.data);
        setCredits({
          cast: creditRes.data.cast?.slice(0, 10) || [],
          crew: creditRes.data.crew?.slice(0, 10) || [],
        });

      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Main />
        <p className="text-center mt-10 text-gray-500">Carregando...</p>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Main />
        <p className="text-center mt-10 text-red-500">Filme não encontrado.</p>
      </>
    );
  }

  return (
    <>
      <Main />

      <div className="min-h-screen bg-gray-100 p-8">

        <Link to="/dashboard" className="text-blue-600 underline mb-6 inline-block">
          ← Voltar
        </Link>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-72 rounded-lg shadow"
          />

          {/* Informações */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <p className="text-gray-700 mb-6">{movie.overview}</p>

            <h2 className="text-xl font-semibold mb-2">Gêneros</h2>
            <div className="flex gap-2 mb-6">
              {(movie.genres || []).map(g => (
                <span key={g.id} className="px-3 py-1 bg-blue-200 rounded-full text-sm">
                  {g.name}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Elenco (Top 10)</h2>
            <ul className="list-disc ml-5 mb-6">
              {credits.cast.map(actor => (
                <li key={actor.id}>{actor.name} — {actor.character}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Equipe Técnica (Top 10)</h2>
            <ul className="list-disc ml-5">
              {credits.crew.map(person => (
                <li key={person.id}>{person.name} — {person.job}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </>
  );
}
