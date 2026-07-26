# README ev4 Front End

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

Declaración

Las herramientas de Inteligencia Artificial fueron utilizadas únicamente como apoyo durante el desarrollo del proyecto. La integración de los distintos componentes, la adaptación del código, las pruebas de funcionamiento y las decisiones de implementación fueron realizadas por el equipo de desarrollo.
