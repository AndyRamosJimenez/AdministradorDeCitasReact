import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/formulario";
import clienteAxios from "./config/axios";
import Cita from "./components/Cita";
import PropTypes from "prop-types";
const App = () => {
  // Citas en total storange

  // crea un state y se crea la funcion que lo modifica
  const [citas, guardarCitas] = useState([]);

  //usa effect para ciertas operaciones cuando el state cambia
  useEffect(() => {
    mostrarCita();
  });

  const mostrarCita = async () => {
    const resultado = await clienteAxios.get("/api/pacientes/revisar");
    guardarCitas(resultado.data.paciente);
  };

  const crearCita = async (cita) => {
    await clienteAxios.post("/api/pacientes/create", cita);
    mostrarCita();
  };

  const eliminarCita = async (id) => {
    await clienteAxios.delete(`/api/pacientes/eliminar/${id}`);
    mostrarCita();
  };
  //if ternario
  const titulo = citas.length === 0 ? "No hay citas" : "Administrar tus citas";

  return (
    <Fragment>
      <h1>Administrador cita</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h1>{titulo}</h1>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Formulario.prototype = {
  crearCita: PropTypes.func.isRequired,
};

export default App;
