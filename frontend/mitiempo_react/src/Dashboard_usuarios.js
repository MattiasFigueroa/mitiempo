import React, { useState, useMemo, useEffect } from 'react';
import './Dashboard_usuarios.css'; // Archivo CSS para estilos

const API_BASE = 'http://localhost:8000/api'; // URL base de Django

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]); // Estado para empleados (de API)
  const [terminoBusqueda, setTerminoBusqueda] = useState(''); // Estado para el buscador
  const [cargando, setCargando] = useState(true); // Para mostrar loading
  const [error, setError] = useState(null); // Para errores

  // Cargar empleados desde API al montar el componente
  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`${API_BASE}/empleados/`);
        if (!respuesta.ok) throw new Error('Error al cargar empleados');
        const datos = await respuesta.json();
        setEmpleados(datos); // DRF devuelve array de objetos
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarEmpleados();
  }, []);

  // Filtrado con useMemo para eficiencia
  const empleadosFiltrados = useMemo(() => {
    return empleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }, [terminoBusqueda, empleados]);

  // Función para agregar empleado (POST a API)
  const manejarAgregarEmpleado = async () => {
    const nombre = prompt('Nombre del empleado:');
    if (!nombre) return;
    const cargo = prompt('Cargo:');
    if (!cargo) return;
    const salario = prompt('Salario:');
    if (!salario) return;
    const departamento = prompt('Departamento:');
    if (!departamento) return;

    try {
      const respuesta = await fetch(`${API_BASE}/empleados/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, cargo, salario: parseFloat(salario), departamento }),
      });
      if (!respuesta.ok) throw new Error('Error al agregar empleado');
      const nuevoEmpleado = await respuesta.json();
      setEmpleados([...empleados, nuevoEmpleado]); // Actualiza estado local
      alert('Empleado agregado exitosamente');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Función para editar empleado (PUT a API)
  const manejarEditarEmpleado = async (id) => {
    const empleadoActual = empleados.find(e => e.id === id);
    const nombre = prompt('Nuevo nombre:', empleadoActual.nombre);
    if (nombre === null) return;
    const cargo = prompt('Nuevo cargo:', empleadoActual.cargo);
    if (cargo === null) return;
    const salario = prompt('Nuevo salario:', empleadoActual.salario);
    if (salario === null) return;
    const departamento = prompt('Nuevo departamento:', empleadoActual.departamento);
    if (departamento === null) return;

    try {
      const respuesta = await fetch(`${API_BASE}/empleados/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre || empleadoActual.nombre, cargo: cargo || empleadoActual.cargo, salario: parseFloat(salario) || empleadoActual.salario, departamento: departamento || empleadoActual.departamento }),
      });
      if (!respuesta.ok) throw new Error('Error al editar empleado');
      const empleadoActualizado = await respuesta.json();
      setEmpleados(empleados.map(e => e.id === id ? empleadoActualizado : e)); // Actualiza estado local
      alert('Empleado editado exitosamente');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Función para eliminar empleado (DELETE a API)
  const manejarEliminarEmpleado = async (id) => {
    if (window.confirm(`¿Eliminar empleado ID: ${id}?`)) {
      try {
        const respuesta = await fetch(`${API_BASE}/empleados/${id}/`, {
          method: 'DELETE',
        });
        if (!respuesta.ok) throw new Error('Error al eliminar empleado');
        setEmpleados(empleados.filter(e => e.id !== id)); // Actualiza estado local
        alert('Empleado eliminado exitosamente');
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  // Render loading o error
  if (cargando) return <div className="contenedorListaEmpleados"><h2>Cargando empleados...</h2></div>;
  if (error) return <div className="contenedorListaEmpleados"><h2>Error: {error}</h2></div>;

  return (
    <div className="contenedorListaEmpleados">
      <h2>Lista de Empleados</h2>
      
      {/* Fila de encabezado con botón agregar y buscador */}
      <div className="filaEncabezado">
        <button className="btnAgregarEmpleado" onClick={manejarAgregarEmpleado}>
          + Agregar Empleado
        </button>
        <div className="contenedorBusqueda">
          <input
            type="text"
            placeholder="Buscar empleado por nombre..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="inputBusqueda"
          />
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="gridTarjetas">
        {empleadosFiltrados.length > 0 ? (
          empleadosFiltrados.map((empleado) => (
            <div key={empleado.id} className="tarjetaEmpleado">
              <div className="encabezadoTarjeta">
                <span className="iconoPerfil">👤</span>
                <h3 className="nombreEmpleado">{empleado.nombre}</h3>
              </div>
              <div className="cuerpoTarjeta">
                <p><strong>ID:</strong> {empleado.id}</p>
                <p><strong>Cargo:</strong> {empleado.cargo}</p>
                <p><strong>Salario:</strong> ${parseFloat(empleado.salario).toLocaleString()}</p>
                <p><strong>Departamento:</strong> {empleado.departamento}</p>
              </div>
              <div className="accionesTarjeta">
                <button 
                  className="btnEditar" 
                  onClick={() => manejarEditarEmpleado(empleado.id)}
                >
                  Editar Perfil
                </button>
                <button 
                  className="btnEliminar" 
                  onClick={() => manejarEliminarEmpleado(empleado.id)}
                >
                  Eliminar Perfil
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay empleados que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default ListaEmpleados;
