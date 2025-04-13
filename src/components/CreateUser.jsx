import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol] = useState('usuario'); // El rol siempre será "usuario"
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            //const response = await axios.post('http://localhost:5000/v1/drivers/Usuarios', {
            const response = await axios.post('https://pedidos-back-end.vercel.app/v1/drivers/Usuarios', {
                correo,
                contrasena,
                nombre,
                rol
            });

            if (response.data.success) {
                setSuccessMessage('Usuario creado exitosamente');
                
                // Limpiar campos después de crear el usuario
                setCorreo('');
                setNombre('');
                setContrasena('');

                // Redirigir después de 2 segundos
                setTimeout(() => navigate('/'), 2000);
            } else {
                setErrorMessage(response.data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.response?.data?.message || 'Error en la solicitud');
        }
    };

    return (
        <div className='allcreateUser'>
            <div className="container">
                <form onSubmit={handleCreateUser}>
                    <div className='Bloque de registro'>
                        <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                        <input
                            type="text"
                            id="inputNombre"
                            placeholder="Nombre completo"
                            value={nombre} // Se asegura de que el input se limpie
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />                                                  
                        <div className="email">
                            <input
                                type="text"
                                id="inputUsername"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="password">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="inputPassword"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            {showPassword ? "Ocultar" : "Mostrar"} Contraseña
                        </label>
                        </div>
                        <button type="submit" id="btnCreateUser">Crear Usuario</button>
                        <button type="button" id="btnCreateUser" onClick={() => navigate('/')}>
                            Regresar
                        </button>
                        {successMessage && <p className="success">{successMessage}</p>}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;