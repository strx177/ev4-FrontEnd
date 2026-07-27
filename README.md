# README ev4 Front End

## Ejecución del linter

En el commit `de0b4fc` se corrigieron todos los errores relevantes mostrados por el linter, los cuales de un total de 13 problemas (11 errores y 2 advertencias)
pasamos a 3 problemas (3 errores y 0 advertencias).

```
\ev4-FrontEnd\src\components\mascotas\MascotasForm.jsx
  43:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

  41 |
  42 |   useEffect(() => {
> 43 |     fetchChoices();
     |     ^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  44 |   }, []);
  45 |
  46 |   useEffect(() => {                                                                                                         react-hooks/set-state-in-effect
  49:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

  47 |     if (!mascota) return;
  48 |
> 49 |     setNombre(mascota.nombre ?? "");
     |     ^^^^^^^^^ Avoid calling setState() directly within an effect
  50 |     setDescripcion(mascota.descripcion ?? "");
  51 |     setEdad(mascota.edad ?? "");
  52 |     setRaza(mascota.raza ?? "");  react-hooks/set-state-in-effect

\frontend\ev4-FrontEnd\src\pages\MascotasPage.jsx
  42:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

  40 |
  41 |   useEffect(() => {
> 42 |     fetchMascotas();
     |     ^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  43 |   }, []);
  44 |
  45 |   const mascotasFiltradas = mascotasList.filter((m) => {  react-hooks/set-state-in-effect
✖ 3 problems (3 errors, 0 warnings)
```

Se mantuvieron estos 3 problemas dado que:

**Problema 1:** El linter está interpretando como error un patrón común en CRUDs.

**Problema 2:** Se está usando useEffect para actualizar estados, también común. Podría adaptarse a form pero eso implica modificar la lógica de envío y gran parte del código.

**Problema 3:** Uso esperado del useEffect.

## Uso de herramientas de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizaron las siguientes herramientas de Inteligencia Artificial como apoyo al realizar esta evaluación

## ChatGPT

Se utilizó como asistente de desarrollo para:

Resolver dudas relacionadas con React, JavaScript y Bootstrap.
Apoyar la implementación de componentes reutilizables.
Proponer mejoras en el diseño de la interfaz de usuario.
Ayudar en la integración con la API REST.
Asistir en la detección y resolución de errores durante el desarrollo.
Explicar conceptos y buenas prácticas de programación cuando fue necesario.

Un ejemplo de ChatGPT que nos ayudó en el código fue en la parte del editar mascota que nosotros al usar put nos daba error al no cambiar la imagen entonces ChatGPT sugirió usar patch para saltar los campos que no se cambiaran

```
const editarMascota = async (formData) => {
    try {
      await mascotasApi.patch(`mascotas/${id}/`, formData);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
```

## GitHub Copilot

Se utilizó dentro de Visual Studio Code para:

Generar sugerencias de código en tiempo real las cuales no usamos del todo pero ayudaron a adaptar el código.
Utilizar el botón fix para problemas de formato generalmente ayudas con los paréntesis, llaves y corchetes
Agilizar la escritura de componentes y lógica de React.

## Antigravity IDE

Se utilizó como apoyo para:

Generar propuestas de diseño visual para la interfaz.
Ayudar con las paletas de colores para que se vea una interfaz amigable con el usuario
Sugerir mejoras en la organización de los componentes.
Facilitar la construcción de la apariencia del proyecto utilizando Bootstrap.

Un ejemplo de antigravity fue una sugerencia que aplicamos la cual fue la de crear una preview de la imagen que uno sube aquí está el código adaptado que utilizamos

```
const [preview, setPreview]
---
<input
                      id="imagenInput"
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={(e) => {
                        const archivo = e.target.files[0];
                        setImagen(archivo);
                        if (archivo) {
                          setPreview(URL.createObjectURL(archivo));
                        }
                      }}
                    />

                    <div className="card mt-2">
                      <p></p>
                      {preview  mascota?.imagen ? (
                        <>
                          <img
                            src={preview  mascota.imagen}
                            alt="Vista previa"
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: "250px", objectFit: "contain" }}
                          />
```

Agregar un sistema de búsqueda por filtro para la lista de mascotas

```
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
```

Sugerencias de lógica para diseño e implementación de mensaje de error de conexión con la página/api

src/components/mascotas/MascotasList.jsx :

```
function MascotasList({ lista, cargando, fetchMascotas, error }) {
```

```
if (error) {
  return (
    <div className="container mb-5 mt-4 text-center">
      <div className="alert alert-danger shadow-sm d-inline-block rounded-4 p-4 border-0" role="alert">
        <i className="bi bi-exclamation-triangle-fill fs-1 d-block mb-3 text-danger"></i>
        <h5 className="fw-bold text-dark m-0">{error}</h5>
      </div>
    </div>
  );
}
```

src/pages/MascotasPage.jsx :

```
 const [error, setError] = useState(null);
```

```
<MascotasList lista={mascotasFiltradas} onSubmit={addMascotas} cargando={cargando} fetchMascotas={fetchMascotas} error={error} />
```

Declaración

Las herramientas de Inteligencia Artificial fueron utilizadas únicamente como apoyo durante el desarrollo del proyecto. La integración de los distintos componentes, la adaptación del código, las pruebas de funcionamiento y las decisiones de implementación fueron realizadas por el equipo de desarrollo.

# Preguntas conceptuales

## a. ¿Qué es destructuring y en qué situaciones lo utilizaron en el proyecto?

Es una sintaxis de JavaScript que permite extraer valores de un objeto o un arreglo y guardarlos directamente en variables.

En el proyecto lo usamos principalmente en:

- **useState:** `const [error, setError] = useState("")`.
- **Props:** `function MascotasList({ lista, cargando, fetchMascotas, error })`.
- **useParams:** `const { id } = useParams()`.

---

## b. ¿Qué hace async/await y qué problema resuelve frente al uso de .then()?

`async/await` permite trabajar con operaciones asíncronas, como las peticiones a la API, de una forma más clara y ordenada.
La palabra `async` indica que una función es asíncrona, mientras que await hace que el código espere la respuesta de una promesa antes de continuar con la siguiente instrucción, sin bloquear la ejecución de la aplicación.

En lugar de usar repetidamente `.then()`, el código se lee de arriba hacia abajo y los errores se pueden manejar fácilmente con `try/catch`.

```
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
```

```
const editarMascota = async (formData) => {
    try {
      await mascotasApi.patch(`mascotas/${id}/`, formData);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };
```

---

## c. ¿Cómo funciona FormData y por qué es necesario para enviar la imagen de una mascota?

FormData permite enviar datos de un formulario, incluyendo archivos.

FormData utiliza el formato `multipart/form-data`, que permite enviar en una misma petición los campos de texto y el archivo de imagen.

Es necesario al trabajar con imágenes porque una imagen se trata como un archivo binario, así que si se intentara enviar junto con los demás datos en un objeto JSON normal el archivo no se transmite de forma correcta.

---

## d. ¿Qué son las props en React?

Las props son datos que un componente padre envía a un componente hijo.

Sirven para que el componente hijo pueda mostrar o utilizar esa información sin modificarla. Por ejemplo, `MascotasList` recibe la lista de mascotas y otros datos mediante props.

Componente padre:

```
<MascotasList
  lista={mascotasFiltradas}
  onSubmit={addMascotas}
  cargando={cargando}
  fetchMascotas={fetchMascotas}
  error={error}
/>
```

Componente hijo:

```
function MascotasList({ lista, cargando, fetchMascotas, error }) {
  ...
}
```

---

## e. ¿Qué son los componentes en React?

Los componentes son funciones reutilizables que representan partes de la interfaz de la aplicación.

En el proyecto utilizamos componentes como `MascotasForm`, `MascotasList`, `MascotaCard` y `MascotasDetail` para mantener el código organizado.

---

## f. ¿Por qué no es una buena práctica mostrar al usuario final el mensaje de error tal como lo entrega la API?

Porque los mensajes de la API suelen ser técnicos y pueden confundir al usuario o mostrar información interna del sistema. Mostrar detalles sobre errores en pantalla también expone la estructura y funcionamiento interno de la app y puede llevar a uso malintencionado.

---

## g. ¿Qué diferencia existe entre PATCH y PUT, y por qué se utiliza PATCH para actualizar una mascota?

**PUT** reemplaza todo el recurso, mientras que **PATCH** solo actualiza los campos que cambiaron.

En el proyecto usamos **PATCH** porque al editar una mascota no siempre se modifica la imagen. Si se utilizara **PUT** y no se enviara nuevamente el archivo de imagen, podría eliminarse o quedar vacía, ya que **PUT** espera recibir todos los datos del recurso.

Con **PATCH** solo se envían los campos que cambiaron. Así, si el usuario actualiza únicamente el nombre o la descripción, la imagen no se envía y se conserva que ya estaba almacenada.
