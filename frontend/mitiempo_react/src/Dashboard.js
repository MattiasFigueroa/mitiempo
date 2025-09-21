// src/Dashboard.js
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    fetch('http://127.0.0.1:8000/api/user/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h1>¡Hola, {user.username}!</h1>
      <p>Bienvenido al sistema</p>
    </div>
  );
}

export default Dashboard;
