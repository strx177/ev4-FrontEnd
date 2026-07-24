import { Link } from "react-router-dom";

export default function MascotaCard({ mascota, onDelete }) {
  const estados = {
    perdida: {
      texto: "Perdida",
      clase: "bg-danger",
    },
    encontrada: {
      texto: "Encontrada",
      clase: "bg-success",
    },
    en_adopcion: {
      texto: "En adopción",
      clase: "bg-warning text-dark",
    },
    adoptada: {
      texto: "Adoptada",
      clase: "bg-primary",
    },
  };

  const estado = estados[mascota.estado] || {
    texto: mascota.estado,
    clase: "bg-secondary",
  };

  return (
    <div className="card shadow-sm h-100">
      <img
        src={mascota.imagen}
        className="card-img-top"
        alt={mascota.nombre}
        style={{ height: "250px", objectFit: "scale-down" }}
      />

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="card-title mb-0">{mascota.nombre}</h2>

          <span className={`badge ${estado.clase}`}>
            Estado: {estado.texto}
          </span>
        </div>

        <div className="text-center">
          <p className="text-muted mb-4">
            Raza: {mascota.raza} • Sexo: {mascota.sexo} • Edad: {mascota.edad}{" "}
            años
          </p>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Link
            to={`${mascota.id}`}
            className="btn btn-outline-primary btn-sm flex-fill"
          >
            Ver detalle mascota
          </Link>
          <Link
            to={`${mascota.id}/editar`}
            className="btn btn-outline-secondary btn-sm flex-fill"
          >
            Editar mascota
          </Link>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={() => onDelete(mascota.id)}
          >
            Eliminar mascota
          </button>
        </div>
      </div>
    </div>
  );
}
