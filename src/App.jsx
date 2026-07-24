import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasForm from "./components/mascotas/MascotasForm";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import MascotasEdit from "./components/mascotas/MascotasEdit";

function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
          <div className="container-fluid">
            <h1 className="navbar-brand fs-2 fw-bold m-0">Mascotas perdidas</h1>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
                <li className="nav-item">
                  <NavLink to={"/mascotas"} className={"nav-link fs-5"}>
                    Ver mascotas
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to={"/mascotas/crear"}
                    className={"btn btn-warning fw-semibold"}
                  >
                    Registrar mascota
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
          <Route path="/mascotas/crear" element={<MascotasForm />} />
          <Route path="/mascotas/:id/editar" element={<MascotasEdit />} />

          {/* Redirige a /mascotas para evitar página vacía */}
          <Route path="/" element={<Navigate to="/mascotas" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
