import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/UserHome.css';

// Función para obtener TODAS las ventas
const fetchVentas = async () => {
  try {
    const response = await axios.get('http://localhost:5000/v1/drivers/Venta');
    return response.data; // Retorna todas las ventas
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return [];
  }
};

function UserHome() {
  const [user, setUser] = useState({ nombre: '', correo: '', _id: '' });
  const [producto, setProducto] = useState('');
  const [valor, setValor] = useState('');
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carga el usuario guardado en localStorage (sin validaciones)
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

    // Carga TODAS las ventas sin filtro
    const loadVentas = async () => {
      const ventasData = await fetchVentas();
      setVentas(ventasData);
    };

    loadVentas();
  }, []);

  const handlePayment = () => {
    navigate('/createVenta', { state: { producto, valor } });
  };

  return (
    <div className='allUserHome'>
      <div className="user-home">
        <header className="header">
          <nav>
            <button onClick={() => navigate('/ChangePassword')}>Cambiar Contraseña</button>
            <button onClick={() => navigate('/')}>Cerrar Sesión</button>
          </nav>
        </header>

        <main className="main-content">
          <h1 className="welcome">¡Bienvenido {user.nombre}!</h1>

          <section className="user-info">
            <h2>Información del Usuario</h2>
            <table>
              <tbody>
                <tr><td>Nombre:</td><td>{user.nombre}</td></tr>
                <tr><td>Correo:</td><td>{user.correo}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="registrar-codigo">
            <h2>Registrar Nueva Compra</h2>
            <label>Producto:</label>
            <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} required placeholder="Nuevo producto" />

            <label>Valor:</label>
            <input
              type="text"
              value={new Intl.NumberFormat('es-CO').format(valor)} 
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                setValor(rawValue);
              }}
              required
              placeholder="Valor del producto"
            />
            <button onClick={handlePayment} className="submit-btn">Pagar</button>
          </section>

          <section className="code-list">
            <h2>Historial de Compras</h2>
            <table>
            <thead>
           <tr>
            <th>Fecha de Registro</th><th>Producto</th><th>Valor</th><th>Estado</th></tr></thead>
              <tbody>
                {ventas.length > 0 ? (
                  ventas.map((venta, index) => (
                    <tr key={index}>
                      <td>{new Date(venta.fechaReg).toLocaleDateString()}</td>
                      <td>{venta.producto}</td>
                      <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(venta.valor)}</td>
                      <td>{venta.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay compras registradas</td>
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

export default UserHome;