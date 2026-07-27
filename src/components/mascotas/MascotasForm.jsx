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

  const [error, setError] = useState("");

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
    //console.log(imagen);

    const formData = new FormData();

    if (!mascota && !imagen) {
      setError("Debes seleccionar una imagen.");
      return;
    }

    if (!nombre.trim() || !descripcion.trim()) {
      setError("Los campos obligatorios deben estar completos.");
      return;
    }

    if (nombre.trim().length > 100) {
      setError("El nombre no puede superar los 100 caracteres.");
      return;
    }

    if (edad !== "" && (!Number.isInteger(Number(edad)) || Number(edad) < 0)) {
      setError("La edad debe ser un número entero mayor o igual a 0.");
      return;
    }

    if (raza.trim().length > 100) {
      setError("La raza no puede superar los 100 caracteres.");
      return;
    }

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
    setError("");

    mascota
      ? alert("La mascota se editó correctamente.")
      : alert("La mascota se registró correctamente.");

    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow3-lg border-0 shadow">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 fw-bold">
                {mascota ? "Editar mascota" : "Registrar mascota"}
              </h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <h5 className="text-primary fw-bold">Imagen *</h5>

                  <div className="mb-3">
                    <input
                      id="imagenInput"
                      type="file"
                      className="d-none"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={(e) => {
                        const archivo = e.target.files[0];
                        if (archivo) {
                          const allowedTypes = ["image/jpeg", "image/png"];
                          if (!allowedTypes.includes(archivo.type)) {
                            setError(
                              "Solo se admiten fotos en formato JPG y PNG.",
                            );
                            setImagen(null);
                            setPreview(null);
                            e.target.value = "";
                            return;
                          }
                          setImagen(archivo);
                          setPreview(URL.createObjectURL(archivo));
                          setError("");
                        }
                      }}
                    />

                    <div className="card mt-2">
                      <p></p>
                      {preview || mascota?.imagen ? (
                        <>
                          <img
                            src={preview || mascota.imagen}
                            alt="Vista previa"
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: "250px", objectFit: "contain" }}
                          />

                          <h5 className="text-primary fw-bold">
                            Imagen seleccionada:
                          </h5>

                          <p className="text-muted mb-1">
                            {imagen
                              ? imagen.name
                              : "Imagen actual de la mascota"}
                          </p>
                          <p className="text-info mb-3 fw-bold small">
                            * Solo se admiten archivos JPG y PNG
                          </p>

                          <label
                            htmlFor="imagenInput"
                            className="btn btn-primary px-4 mx-4 mb-2"
                            style={{ cursor: "pointer" }}
                          >
                            Cambiar imagen
                          </label>
                        </>
                      ) : (
                        <>
                          <h5 className="text-primary fw-bold text-center">
                            Agrega una fotografía
                          </h5>

                          <p className="text-muted mb-2 text-center">
                            Selecciona una imagen para ayudar a identificar la
                            mascota
                          </p>
                          <p className="text-info mb-4 text-center fw-bold small">
                            * Solo se admiten archivos JPG y PNG
                          </p>

                          <label
                            htmlFor="imagenInput"
                            className="btn btn-primary px-4 mx-4 mb-2"
                            style={{ cursor: "pointer" }}
                          >
                            Seleccionar imagen
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-4" />

                <h5 className="text-primary fw-bold mb-3">
                  Información general
                </h5>
                <p className="text-secondary">
                  Los campos marcados con * son obligatorios.
                </p>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3 ">
                  <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                    Descripción *
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Estado
                    </label>

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
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Tipo de animal
                    </label>

                    <select
                      className="form-select"
                      value={selectedTipoMascota}
                      onChange={(e) =>
                        setTipoMascotaSeleccionada(e.target.value)
                      }
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
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Edad
                    </label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                    />
                  </div>

                  <div className="col-md-8 mb-3">
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Raza
                    </label>

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
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Sexo
                    </label>

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

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold text-primary px-2 py-1 rounded">
                      Tamaño
                    </label>

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

                <hr />

                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button type="submit" className="btn btn-success px-4">
                    {mascota ? "Editar mascota" : "Registrar mascota"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={() => navigate("/")}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MascotasForm;
