import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/AdminHome.css';

const fetchVentas = async () => {
  try {
    //const response = await axios.get('http://localhost:5000/v1/drivers/Venta');
    const response = await axios.get('https://pedidos-back-end.vercel.app/v1/drivers/Venta');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return [];
  }
};

function AdminHome() {
  const [user, setUser] = useState({ nombre: '', correo: '', rol: '' });
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
  
    const loadVentas = async () => {
      const ventasData = await fetchVentas();
      setVentas(ventasData);
    };
  
    loadVentas();
  }, []);
  
  return (
    <div className='allAdminHome'>
      <div className="admin-home">
        <header className="header">
          <img src="/logo.png" alt="MarketPlace" className="logo" />
          <nav>
            <button onClick={() => navigate('/ChangePassword')}>Cambiar Contraseña</button>
            <button onClick={() => navigate('/')}>Cerrar Sesión</button>
          </nav>
        </header>

        <main className="main-content">
          <h1 className="welcome">¡Bienvenido {user.nombre}!</h1>

          <section className="admin-info">
            <h2>Información del Administrador</h2>
            <table>
              <tbody>
              <tr><td>Nombre:</td><td>{user.nombre}</td></tr>
              <tr><td>Correo:</td><td>{user.correo}</td></tr>
                <tr><td>Rol:</td><td>{"Administrador"}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="code-list">
            <h2>Historial de Compras</h2>
            <table>
              <thead>
                <tr>
                  <th>Fecha de Registro</th>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Celular</th>
                  <th>Producto</th>
                  <th>Valor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length > 0 ? (
                  ventas.map((venta, index) => (
                    <tr key={index}>
                      <td>{new Date(venta.fechaReg).toLocaleDateString()}</td>
                      <td>{venta.nombre}</td>
                      <td>{venta.cedula}</td>
                      <td>{venta.telefono}</td>
                      <td>{venta.producto}</td>
                      <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(venta.valor)}</td>
                      <td>{venta.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay compras registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2025 MarketPlace. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default AdminHome;
