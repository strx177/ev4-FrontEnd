import { useParams } from "react-router-dom";
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

  const fetchComentarios = async () => {
    try {
      const response = await mascotasApi.get("/comentarios/");

      console.log(response.data);

      setComentarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMascotaDetail = async () => {
    try {
      const response = await mascotasApi.get(`mascotas/${id}/`);
      console.log(response.data);
      setMascota(response.data);
    } catch (error) {
      console.log(error);
      setFetchError(true);
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

  return (
    <div>
      {fetchError ? (
        <p>404 - Mascota no encontrada</p>
      ) : (
        <>
          <h2>{mascota?.nombre}</h2>
          <img src={mascota?.imagen} alt={mascota?.nombre} />
          <p>{mascota?.descripcion}</p>
          <p>Edad: {mascota?.edad}</p>
          <p>Raza: {mascota?.raza}</p>
          <h4 className="mt-4">Comentarios</h4>
          {comentarios.filter((c) => c.mascota === Number(id)).length === 0 ? (
            <p>No hay comentarios para esta mascota</p>
          ) : (
            comentarios
              .filter((c) => c.mascota === Number(id))
              .map((comentario) => (
                <div key={comentario.id} className="card mb-3">
                  <div className="card-body">
                    <h6 className="card-title">{comentario.autor}</h6>
                    <p className="card-text">{comentario.contenido}</p>
                    <small className="text-muted">
                      {new Date(comentario.fecha_creacion).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))
          )}

          <h4 className="mt-4">Agregar un comentario</h4>
          <form onSubmit={handleSubmitComentario} className="mb-4">
            <div className="mb-3">
              <label htmlFor="autor" className="form-label">Autor</label>
              <input 
                type="text" 
                className="form-control" 
                id="autor" 
                value={nuevoAutor} 
                onChange={(e) => setNuevoAutor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">Comentario</label>
              <textarea 
                className="form-control" 
                id="contenido" 
                rows="3"
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar Comentario"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default MascotasDetail;
