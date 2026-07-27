import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import MascotasForm from "../components/mascotas/MascotasForm";

export default function MascotasEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await mascotasApi.get(`mascotas/${id}/`);
        console.log(response.data);
        setMascota(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascota();
  }, [id]);

  const editarMascota = async (formData) => {
    try {
      await mascotasApi.patch(`mascotas/${id}/`, formData);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  if (loading) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return <MascotasForm mascota={mascota} onSubmit={editarMascota} />;
}
