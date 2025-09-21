import React, { useState } from 'react';
import './Login.css';
import fondo from './imagenes/fondo.jpeg';

function Login() {
  const [username, setUsername] = useState(''); // Usar username de Django
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // Django usa username, no email por defecto
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar tokens en localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        alert('¡Login exitoso!');
        // Redirigir al dashboard
        window.location.href = '/dashboard';
      } else {
        alert('Error: ' + (data.detail || 'Usuario o contraseña incorrecta'));
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-left"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <h1>Romina Magallanez</h1>
        <p>ESTILISTA</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
          <div className="login-links">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;





