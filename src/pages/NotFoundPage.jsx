import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container py-5">
      <div className="text-center bg-white p-5 rounded-4 shadow-sm">
        <h2 className="text-danger fw-bold">
          <i className="bi bi-exclamation-triangle me-2"></i>404
        </h2>
        <h3 className="fw-bold mb-3">Página no encontrada</h3>
        <p className="text-muted fs-5">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/mascotas"
          className="btn btn-primary mt-3 rounded-pill px-4"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
