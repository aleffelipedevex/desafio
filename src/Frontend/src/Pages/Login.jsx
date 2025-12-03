import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("teste@teste.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login. Verifique email e senha.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Acessar Conta
        </h1>

        <form onSubmit={submit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow"
          >
            Entrar
          </button>

          <div className="text-sm text-gray-500 text-center">
            Use <strong>teste@teste.com</strong> / <strong>123456</strong> para testar.
          </div>
        </form>

        {/* Rodapé */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} - Sistema Desafio
        </p>
      </div>
    </div>
  );
}
