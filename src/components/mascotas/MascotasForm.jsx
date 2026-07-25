import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import { useNavigate } from "react-router-dom";

function MascotasForm({ mascota = null, onSubmit }) {
  const [estados, setEstados] = useState([]);
  const [tipoMascota, setTipoMascota] = useState([]);
  const [sexo, setSexo] = useState([]);
  const [tamano, setTamano] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [edad, setEdad] = useState("");
  const [raza, setRaza] = useState("");

  const [selectedEstado, setEstado] = useState("perdida");
  const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState("otro");
  const [selectedSexo, setSexoSeleccionado] = useState("");
  const [selectedTamano, setTamanoSeleccionado] = useState("");

  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const fetchChoices = async () => {
    try {
      const response = await mascotasApi.get("choices/");

      console.log(response.data.estado);
      setEstados(response.data.estado);
      setTipoMascota(response.data.tipo_animal);
      setSexo(response.data.sexo);
      setTamano(response.data.tamano);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  useEffect(() => {
    if (!mascota) return;

    setNombre(mascota.nombre ?? "");
    setDescripcion(mascota.descripcion ?? "");
    setEdad(mascota.edad ?? "");
    setRaza(mascota.raza ?? "");

    setEstado(mascota.estado ?? "perdida");
    setTipoMascotaSeleccionada(mascota.tipo_animal ?? "otro");
    setSexoSeleccionado(mascota.sexo ?? "");
    setTamanoSeleccionado(mascota.tamano ?? "");
  }, [mascota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(nombre, descripcion, edad, raza, selectedEstado, selectedTipoMascota, selectedSexo, selectedTamano, imagen);
    console.log(imagen);

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("edad", edad);
    formData.append("raza", raza);
    formData.append("estado", selectedEstado);
    formData.append("tipo_animal", selectedTipoMascota);
    formData.append("sexo", selectedSexo);
    formData.append("tamano", selectedTamano);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    onSubmit(formData);

    mascota
      ? alert("La mascota se editó correctamente.")
      : alert("La mascota se registró correctamente.");

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="mb-4">
            {mascota ? "Editar mascota" : "Registrar mascota"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {mascota?.imagen && (
              <div className="mb-3 text-center">
                <p className="mb-2">Imagen actual</p>

                <img
                  src={mascota.imagen}
                  alt={mascota.nombre}
                  className="img-thumbnail"
                  style={{ maxHeight: "220px", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Imagen {!mascota && "*"}</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const archivo = e.target.files[0];
                  setImagen(archivo);
                  if (archivo) {
                    setPreview(URL.createObjectURL(archivo));
                  }
                }}
                required={!mascota}
              />
              {preview && (
                <div className="mt-3 text-center">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre</label>

              <input
                type="text"
                className="form-control"
                maxLength={100}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>

              <textarea
                className="form-control"
                rows="4"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Estado</label>

                <select
                  className="form-select"
                  value={selectedEstado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  {estados.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tipo de animal</label>

                <select
                  className="form-select"
                  value={selectedTipoMascota}
                  onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                >
                  {tipoMascota.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Edad</label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
              </div>

              <div className="col-md-8 mb-3">
                <label className="form-label">Raza</label>

                <input
                  type="text"
                  maxLength={100}
                  className="form-control"
                  value={raza}
                  onChange={(e) => setRaza(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Sexo</label>

                <select
                  className="form-select"
                  value={selectedSexo}
                  onChange={(e) => setSexoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione...</option>

                  {sexo.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tamaño</label>

                <select
                  className="form-select"
                  value={selectedTamano}
                  onChange={(e) => setTamanoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione...</option>

                  {tamano.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="submit" className="btn btn-success">
                {mascota ? "Editar mascota" : "Registrar mascota"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MascotasForm;
