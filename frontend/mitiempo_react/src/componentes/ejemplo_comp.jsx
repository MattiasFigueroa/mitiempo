import React from "react";  //para que este archivo use REACT
import "../hojas_de_estilo/ejemplo_comp.css"; /* importa la hoja de estilo para este componente */



function NombreComponente(props){   //declaramos un comp.funcional sin props()
  return(     //un comp.funcional retorna elemento jsx (html/js) 

    <div className="contenedor-testimonio">
      <img 
        className="imagen-testimonio"
        src={require("../imagenes/foto_ejemplo.png")}
        alt="foto"
      />

      <div className="contenedor-texto-testimonio">

        <p className="nombre-testimonio">{props.nombre} en {props.pais}</p>
        <p className="cargo-testimonio">{props.cargo} en {props.empresa}</p>
        <p className="texto-testimonio">{props.testimonio}</p>
      </div>

    </div>
      

  );

}

export default NombreComponente; //exporta este archivo para que lo reconozca la pagina