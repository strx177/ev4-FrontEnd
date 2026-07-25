import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";

function MascotasPage() {
  const [mascotasList, setMascotasList] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fetchMascotas = async () => {
    setCargando(true);
    try {
      const response = await mascotasApi.get("mascotas/");
      setMascotasList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const addMascotas = async (mascota) => {
    try {
      const response = await mascotasApi.post("mascotas/", mascota);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      fetchMascotas();
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white py-5 mb-4 shadow-sm">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold text-dark mb-3">Cada mascota merece estar en casa</h1>
              <p className="lead text-muted mb-4">
                Únete a nuestra comunidad. Ayudamos a reunir familias con sus peludos amigos. 
                Si encontraste o perdiste una mascota, estás en el lugar correcto.
              </p>

            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Perro feliz reencontrado" 
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      <MascotasList lista={mascotasList} onSubmit={addMascotas} cargando={cargando} fetchMascotas={fetchMascotas} />

      <Outlet />
    </>
  );
}

export default MascotasPage;
