import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import MascotasForm from "../components/mascotas/MascotasForm";

export default function MascotasCreatePage({ onSubmit }) {
  const crearMascota = async (formData) => {
    try {
      const response = await mascotasApi.post("mascotas/", formData);

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.status); // 400, 404, 415...
      console.log(error.response?.data); // detalle del error
      console.log(error.response?.headers); // headers de la respuesta
      console.log(error.message); // ej. "Network Error"
      //setErrores(error.response?.data ?? { general: "Error de red" });
    }
  };
  return (
    <>
      <MascotasForm onSubmit={crearMascota} />
    </>
  );
}
