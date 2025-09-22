// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard_usuarios from './Dashboard_usuarios.js';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard_usuarios" element={<Dashboard_usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
