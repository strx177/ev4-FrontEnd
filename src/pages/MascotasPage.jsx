import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";

function MascotasPage() {
  const [mascotasList, setMascotasList] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

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

  const mascotasFiltradas = mascotasList.filter(m => {
    const matchSearch = m.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        m.raza?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEspecie = filtroEspecie ? m.tipo_animal === filtroEspecie : true;
    const matchEstado = filtroEstado ? m.estado === filtroEstado : true;
    
    return matchSearch && matchEspecie && matchEstado;
  });

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
              <div className="d-flex gap-3">
                <a href="#buscar" className="btn btn-warning btn-lg px-4 rounded-pill fw-bold">
                  <i className="bi bi-search me-2"></i>Buscar ahora
                </a>
              </div>
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

      {/* Filters Section */}
      <div className="container mb-5" id="buscar">
        <div className="card p-4 rounded-4">
          <h4 className="fw-bold mb-3"><i className="bi bi-funnel me-2 text-primary"></i>Filtros de Búsqueda</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar por nombre, raza o descripción..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filtroEspecie} 
                onChange={(e) => setFiltroEspecie(e.target.value)}
              >
                <option value="">Todas las especies</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="perdida">Perdida</option>
                <option value="encontrada">Encontrada</option>
                <option value="en_adopcion">En Adopción</option>
                <option value="adoptada">Adoptada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <MascotasList lista={mascotasFiltradas} onSubmit={addMascotas} cargando={cargando} fetchMascotas={fetchMascotas} />

      <Outlet />
    </>
  );
}

export default MascotasPage;
