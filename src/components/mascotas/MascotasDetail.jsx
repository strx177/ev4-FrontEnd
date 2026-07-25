import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";

function MascotasDetail() {
  const { id } = useParams();
  const [fetchError, setFetchError] = useState(false);
  const [mascota, setMascota] = useState(null);
  const [comentarios, setComentarios] = useState([]);

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
        </>
      )}
    </div>
  );
}

export default MascotasDetail;
