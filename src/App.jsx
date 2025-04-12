import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [producto, setProducto] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ventas, setVentas] = useState([]);
  

  // Función para obtener las ventas
  const fetchVentas = async () => {
    const response = await fetch('http://localhost:5000/ventas');
    //const response = await fetch('https://rk0k46fr-5000.use.devtunnels.ms/ventas');
    const data = await response.json();
    setVentas(data);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  // Manejar envío del formulario de ventas y Usuarios
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Datos de venta y usuario
    const ventaData = { nombre, producto };
    const usuarioData = { nombre, cedula, correo, direccion, telefono };
  
    try {
      // Enviar datos a ambas colecciones en paralelo
      const [ventaResponse, usuarioResponse] = await Promise.all([
        fetch('http://localhost:5000/ventas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ventaData)
        }),
        fetch('http://localhost:5000/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuarioData)
        })
      ]);s
  
      // Si ambas peticiones son exitosas
      if (ventaResponse.ok && usuarioResponse.ok) {
        fetchVentas(); // Actualizar lista de ventas
  
        // Limpiar el formulario
        setNombre('');
        setProducto('');
        setCedula('');
        setCorreo('');
        setDireccion('');
        setTelefono('');
      } else {
        console.error('Error en la creación de venta o usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  return (
    <div>
      <h2>Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Producto" 
          value={producto} 
          onChange={(e) => setProducto(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Cédula" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Dirección" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
          required 
        />
        <button type="submit">Enviar</button>
      </form>

      <h3>Lista de Ventas</h3>
      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>{venta.nombre} compró {venta.producto}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
