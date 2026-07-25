import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import MascotaCard from "../MascotaCard";
import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

function MascotasList({ lista, onAdd }) {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const eliminarMascota = async (id) => {
    if (
      !confirm(`Estás seguro de que deseas eliminar la mascota con ID: ${id}?`)
    )
      return;
    try {
      await mascotasApi.delete(`mascotas/${id}/`);
      setMascotas((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      setError("Error al eliminar la mascota");
    }
  };

  useEffect(() => {
    mascotasApi
      .get("mascotas/")
      .then(({ data }) => setMascotas(data))
      .catch(() => setError("Error al cargar las mascotas"))
      .finally(() => setCargando(false));
  });

  if (cargando)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando mascotas...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div>
      <h2>Lista mascotas</h2>

      {mascotas.length === 0 ? (
        <div className="alert alert-info">
          No hay mascotas... <Link to="/crear">Crea la primera</Link>
        </div>
      ) : (
        <div className="container-fluid px-4">
          <div className="row g-3">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="col-12 col-md-6 col-lg-4">
                <MascotaCard
                  key={mascota.id}
                  mascota={mascota}
                  onDelete={eliminarMascota}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MascotasList;
