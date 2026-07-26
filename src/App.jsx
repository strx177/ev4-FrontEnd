import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import MascotasPage from "./pages/MascotasPage";
import MascotasCreatePage from "./pages/MascotasCreatePage";
import MascotasEditPage from "./pages/MascotasEditPage";

function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3 sticky-top z-3">
          <div className="container-fluid">
            <h1 className="navbar-brand fs-4 fw-bold m-0 d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-warning"></i>
              Mascotas perdidas
            </h1>

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
                  <NavLink to={"/mascotas"} className={"nav-link fw-medium"}>
                    <i className="bi bi-search me-2"></i>Buscar mascotas
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-2">
                  <NavLink
                    to={"/mascotas/crear"}
                    className={"btn btn-warning fw-bold rounded-pill px-4"}
                  >
                    <i className="bi bi-plus-circle me-2"></i>Publicar mascota
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
          <Route path="/mascotas/crear" element={<MascotasCreatePage />} />
          <Route path="/mascotas/:id/editar" element={<MascotasEditPage />} />

          {/* Redirige a /mascotas para evitar página vacía */}
          <Route path="/" element={<Navigate to="/mascotas" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
