import { Link } from "react-router-dom";

export default function MascotaCard({ mascota, onDelete }) {
  const estados = {
    perdida: {
      texto: "Perdida",
      clase: "bg-danger text-white",
    },
    encontrada: {
      texto: "Encontrada",
      clase: "bg-info text-white",
    },
    en_adopcion: {
      texto: "En adopción",
      clase: "bg-warning text-dark",
    },
    adoptada: {
      texto: "Adoptada",
      clase: "bg-primary text-white",
    },
  };

  const estado = estados[mascota.estado] || {
    texto: mascota.estado,
    clase: "bg-secondary text-white",
  };

  return (
    <div className="card shadow-sm h-100 border-0 rounded-4">
      <img
        src={mascota.imagen}
        className="card-img-top border-top rounded-4"
        alt={mascota.nombre}
        style={{ height: '250px', objectFit: 'scale-down' }}
      />

      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="card-title fw-bold m-0 text-dark">{mascota.nombre}</h4>
          <span className={`badge ${estado.clase} px-3 py-2 rounded-pill shadow-sm`}>
            {estado.texto}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-muted small mb-1">
            <i className="bi bi-tag-fill me-2 text-primary"></i>{mascota.tipo_animal} • {mascota.raza}
          </p>
          <p className="text-muted small mb-1">
            <i className="bi bi-gender-ambiguous me-2 text-primary"></i>{mascota.sexo}
          </p>
          <p className="text-muted small">
            <i className="bi bi-calendar-event me-2 text-primary"></i>{mascota.edad} años
          </p>
        </div>

        <div className="mb-4 flex-grow-1">
          <p className="mb-0 text-muted small lh-lg" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {mascota.descripcion}
          </p>
        </div>

        <div className="d-flex flex-column gap-2 mt-auto">
          <Link
            to={`/mascotas/${mascota.id}`}
            className="btn btn-info text-white w-100 rounded-pill fw-medium shadow-sm"
          >
            <i className="bi bi-eye me-2"></i>Ver detalle
          </Link>
          <div className="d-flex gap-2">
            <Link
              to={`/mascotas/${mascota.id}/editar`}
              className="btn btn-outline-secondary btn-sm flex-fill rounded-pill"
            >
              <i className="bi bi-pencil"></i>
            </Link>
            <button
              className="btn btn-sm btn-outline-danger flex-fill rounded-pill"
              onClick={() => onDelete(mascota.id)}
              title="Eliminar"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
