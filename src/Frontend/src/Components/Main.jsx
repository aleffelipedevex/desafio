import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../Utils/axios";

export default function Main() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Buscar dados do usuário logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300"
        >
          <span className="font-medium">{user ? user.name : "Meu Perfil"}</span>
          <svg
            className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
            {user && (
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 italic">{user.role}</p>
              </div>
            )}
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
