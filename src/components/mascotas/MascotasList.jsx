import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import MascotaCard from "../MascotaCard";

function MascotasList({ lista, onAdd }) {
  return (
    <>
      <h2>Lista mascotas</h2>

      <div className="container-fluid px-4">
        <div className="row g-3">
          {lista.map((mascota) => (
            <div key={mascota.id} className="col-12 col-md-6 col-lg-4">
              <MascotaCard mascota={mascota} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MascotasList;
