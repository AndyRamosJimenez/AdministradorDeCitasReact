import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
const Formulario = ({ crearCita }) => {
  const defaultCita = {
    datos: [],
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    precio: Number,
    sintomas: "",
  };

  /* crear State de citas */
  const [cita, actualizarCitas] = useState(defaultCita);
  const [error, actualizandoError] = useState(false);
  // Funcion que se ejecuta cada que el Paciente escribe en un input
  const actualizarState = (e) => {
    actualizarCitas({
      //...cita realiza una copia deltablet
      ...cita,
      [e.target.name]: e.target.value,
    });
  };
  // Extraer valores
  const { mascota, propietario, fecha, hora, sintomas, precio } = cita;

  const submitCita = (e) => {
    e.preventDefault();
    //validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      precio.trim() === 0 ||
      sintomas.trim() === ""
    ) {
      actualizandoError(true);
      console.log("Hay un erro");
      return;
    }
    //eliminar el elemento privado

    actualizandoError(false);

    //asignar ID
    cita._id = uuid();

    crearCita(cita);
    //crear citas

    //reiniciar formulario
    actualizarCitas(defaultCita);
  };

  return (
    <Fragment>
      <h2>Crear citas</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son necesesario</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascotas</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre del propietaro</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          placeholder="Fecha"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          className="u-full-width"
          onChange={actualizarState}
          value={precio}
        />

        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          agregar citas
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
