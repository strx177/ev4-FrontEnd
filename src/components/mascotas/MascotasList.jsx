import { Link } from "react-router-dom";
import MascotaCard from "../MascotaCard";
import mascotasApi from "../../api/api";

function MascotasList({ lista, cargando, fetchMascotas }) {
  const eliminarMascota = async (id) => {
    if (
      !confirm(`Estás seguro de que deseas eliminar la mascota con ID: ${id}?`)
    )
      return;
    try {
      await mascotasApi.delete(`mascotas/${id}/`);
      if(fetchMascotas) fetchMascotas();
    } catch (error) {
      alert("Error al eliminar la mascota");
    }
  };

  if (cargando)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted fw-medium">Cargando mascotas...</p>
      </div>
    );

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0 text-dark">Resultados ({lista?.length || 0})</h3>
      </div>

      {!lista || lista.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <i className="bi bi-search text-muted" style={{ fontSize: "3rem" }}></i>
          <h4 className="mt-3 text-dark fw-semibold">No se encontraron mascotas</h4>
          <p className="text-muted mb-4">Intenta ajustar tus filtros de búsqueda o registra una nueva mascota.</p>
          <Link to="/mascotas/crear" className="btn btn-warning fw-bold rounded-pill px-4">
            <i className="bi bi-plus-circle me-2"></i>Publicar mascota
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {lista.map((mascota) => (
            <div key={mascota.id} className="col-12 col-md-6 col-lg-4">
              <MascotaCard
                key={mascota.id}
                mascota={mascota}
                onDelete={eliminarMascota}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MascotasList;
