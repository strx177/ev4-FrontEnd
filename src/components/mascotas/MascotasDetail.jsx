import { useParams, Link } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";

function MascotasDetail() {
  const { id } = useParams();
  const [fetchError, setFetchError] = useState(false);
  const [mascota, setMascota] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const [nuevoAutor, setNuevoAutor] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cargando, setCargando] = useState(true);

  const fetchComentarios = async () => {
    try {
      const response = await mascotasApi.get("/comentarios/");
      setComentarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMascotaDetail = async () => {
    try {
      const response = await mascotasApi.get(`mascotas/${id}/`);
      setMascota(response.data);
    } catch (error) {
      console.log(error);
      setFetchError(true);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    if (!nuevoAutor.trim() || !nuevoContenido.trim()) return;

    setSubmitting(true);
    try {
      const response = await mascotasApi.post("/comentarios/", {
        autor: nuevoAutor,
        contenido: nuevoContenido,
        mascota: Number(id),
      });
      setComentarios([...comentarios, response.data]);
      setNuevoAutor("");
      setNuevoContenido("");
    } catch (error) {
      console.log(error);
      alert("Error al enviar el comentario");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchMascotaDetail();
    fetchComentarios();
  }, []);

  const getEstadoClase = (estado) => {
    switch(estado) {
      case 'perdida': return 'bg-danger text-white';
      case 'encontrada': return 'bg-info text-white';
      case 'en_adopcion': return 'bg-warning text-dark';
      case 'adoptada': return 'bg-primary text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const getEstadoTexto = (estado) => {
    switch(estado) {
      case 'perdida': return 'Perdida';
      case 'encontrada': return 'Encontrada';
      case 'en_adopcion': return 'En Adopción';
      case 'adoptada': return 'Adoptada';
      default: return estado;
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted fw-medium">Cargando detalles de la mascota...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {fetchError ? (
        <div className="text-center bg-white p-5 rounded-4 shadow-sm">
          <h2 className="text-danger fw-bold"><i className="bi bi-exclamation-triangle me-2"></i>404</h2>
          <p className="text-muted fs-5">Mascota no encontrada o ha sido eliminada.</p>
          <Link to="/mascotas" className="btn btn-primary mt-3 rounded-pill px-4">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          <div className="col-lg-8">
            <Link to="/mascotas" className="btn btn-outline-secondary rounded-pill mb-4">
              <i className="bi bi-arrow-left me-2"></i>Volver
            </Link>

            <div className="card shadow-sm rounded-4 border-0 mb-5">
              <div className="position-relative">
                <img 
                  src={mascota?.imagen} 
                  alt={mascota?.nombre} 
                  className="w-100 rounded-top-4" 
                  style={{ height: "250px", objectFit: "scale-down" }}
                />
                <div className="position-absolute top-0 end-0 p-3">
                  <span className={`badge ${getEstadoClase(mascota?.estado)} fs-6 shadow-sm rounded-pill px-3 py-2`}>
                    {getEstadoTexto(mascota?.estado)}
                  </span>
                </div>
              </div>

              <div className="card-body p-4 p-lg-5">
                <h1 className="fw-bold text-dark mb-4">{mascota?.nombre}</h1>
                
                <div className="row g-3 mb-4 bg-light rounded-4 p-3">
                  <div className="col-6 col-md-3 text-center border-end">
                    <p className="text-muted small mb-1">Especie</p>
                    <p className="fw-bold mb-0 text-dark">{mascota?.tipo_animal}</p>
                  </div>
                  <div className="col-6 col-md-3 text-center border-end-md">
                    <p className="text-muted small mb-1">Raza</p>
                    <p className="fw-bold mb-0 text-dark">{mascota?.raza}</p>
                  </div>
                  <div className="col-6 col-md-3 text-center border-end">
                    <p className="text-muted small mb-1">Sexo</p>
                    <p className="fw-bold mb-0 text-dark">{mascota?.sexo}</p>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <p className="text-muted small mb-1">Edad</p>
                    <p className="fw-bold mb-0 text-dark">{mascota?.edad} años</p>
                  </div>
                </div>

                <h4 className="fw-bold mb-3">Sobre {mascota?.nombre}</h4>
                <p className="text-muted lh-lg mb-0" style={{ fontSize: "1.1rem" }}>
                  {mascota?.descripcion}
                </p>
              </div>
            </div>

            <div className="card shadow-sm rounded-4 border-0 p-4 p-lg-5">
              <h4 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-chat-left-text text-primary me-2"></i>Comentarios
              </h4>
              
              <div className="mb-5">
                {comentarios.filter((c) => c.mascota === Number(id)).length === 0 ? (
                  <div className="text-center py-4 bg-light rounded-3">
                    <i className="bi bi-chat-square text-muted fs-3 mb-2"></i>
                    <p className="text-muted m-0">No hay comentarios aún. ¡Sé el primero en escribir!</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {comentarios
                      .filter((c) => c.mascota === Number(id))
                      .map((comentario) => (
                        <div key={comentario.id} className="bg-light p-3 rounded-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-bold m-0 text-dark d-flex align-items-center gap-2">
                              <i className="bi bi-person-circle text-info"></i>{comentario.autor}
                            </h6>
                            <small className="text-muted">
                              {new Date(comentario.fecha_creacion).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="text-muted m-0 ms-4">{comentario.contenido}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="border-top pt-4">
                <h5 className="fw-bold mb-3">Agregar un comentario</h5>
                <form onSubmit={handleSubmitComentario}>
                  <div className="mb-3">
                    <label htmlFor="autor" className="form-label text-muted fw-medium small">Nombre</label>
                    <input 
                      type="text" 
                      className="form-control bg-light" 
                      id="autor" 
                      placeholder="Tu nombre"
                      value={nuevoAutor} 
                      onChange={(e) => setNuevoAutor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contenido" className="form-label text-muted fw-medium small">Comentario</label>
                    <textarea 
                      className="form-control bg-light" 
                      id="contenido" 
                      rows="3"
                      placeholder="Escribe tu mensaje aquí..."
                      value={nuevoContenido}
                      onChange={(e) => setNuevoContenido(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-info text-white rounded-pill px-4 py-2 fw-medium shadow-sm" disabled={submitting}>
                    {submitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...</>
                    ) : (
                      <><i className="bi bi-send me-2"></i>Publicar comentario</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MascotasDetail;
