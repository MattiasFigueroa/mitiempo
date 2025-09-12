
import './App.css';
import NombreComponente from "./componentes/ejemplo_comp.jsx"; /* importa el componente */

function App() {
  return (
    <div className="App">
      <div className="contenedor-principal">
        <h1>MI TIEMPO EN LO DE ROMI</h1>
        <NombreComponente  /* crea el componente y lo renderiza en el navegador */
          /* a continuacion escribimos los props que usara este componente con sus valores */
          /* ACLARACION: estos props los tiene que traer de una CRUD/BD */
          nombre="Emma Bostian"
          pais="Argentina"
          cargo="Analista de Sistemas"
          empresa="Despegar"
          testimonio="La función principal de un analista de sistemas es analizar, diseñar, implementar y mejorar sistemas informáticos para que las empresas sean más eficientes y cumplan con sus objetivos de negocio. Para lograrlo, investigan problemas empresariales, desarrollan soluciones tecnológicas, colaboran con equipos de desarrollo, forman a usuarios y se aseguran de que los sistemas sean seguros y estén actualizados. "
          imagen=""

        />
        <NombreComponente  /* crea el componente y lo renderiza en el navegador */
          /* a continuacion escribimos los props que usara este componente con sus valores */
          /* ACLARACION: estos props los tiene que traer de una CRUD/BD */
          nombre="Emma Bostian"
          pais="Argentina"
          cargo="Analista de Sistemas"
          empresa="Despegar"
          testimonio="La función principal de un analista de sistemas es analizar, diseñar, implementar y mejorar sistemas informáticos para que las empresas sean más eficientes y cumplan con sus objetivos de negocio. Para lograrlo, investigan problemas empresariales, desarrollan soluciones tecnológicas, colaboran con equipos de desarrollo, forman a usuarios y se aseguran de que los sistemas sean seguros y estén actualizados. "
          imagen=""

        />
      </div>
    </div>
  );
}

export default App;
