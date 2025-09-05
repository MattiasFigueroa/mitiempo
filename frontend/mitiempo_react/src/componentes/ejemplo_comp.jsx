import React from "react";  //para que este archivo use REACT

function NombreComponente(){   //declaramos un comp.funcional sin props()
  return(     //un comp.funcional retorna elemento jsx (html/js) 

    <div className="contenedor-testimonio">
      <img 
        className="imagen-testimonio"
        src={require("../imagenes/foto_ejemplo.png")}
        alt="foto"
      />

      <div className="contenedor-texto-testimonio">

        <p className="nombre-testimonio">ISABEL</p>
        <p className="cargo-testimonio">INGENIERA DE SOFTWARE</p>
        <p className="nombre-testimonio">Un perfil de ingeniero abarca la aplicación de principios científicos y matemáticos para diseñar, desarrollar y optimizar soluciones a problemas complejos, creando sistemas, estructuras y productos funcionales. Las características clave incluyen la capacidad de resolver problemas, el pensamiento innovador, habilidades técnicas, trabajo en equipo, gestión de proyectos y un fuerte sentido de la ética profesional enfocada en el beneficio social. </p>
      </div>

    </div>
      

  );

}

export default NombreComponente; //exporta este archivo para que lo reconozca la pagina