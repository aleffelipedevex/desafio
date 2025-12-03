import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ROTA PRIVADA - DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* ROTA PRIVADA - DETALHES DO FILME */}
      <Route
        path="/movie/:id"
        element={
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;