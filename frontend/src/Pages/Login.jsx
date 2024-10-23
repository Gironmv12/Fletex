import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoFletex from '../../public/Svg/logoFletexAzul.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center bg-[#f9fafb]">
        <div>
          <img src={LogoFletex} alt="Logo Fletex" className="w-56 h-56 mb-4" />
        </div>
      </div>
      <div className="lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Bienvenido de nuevo!</h2>
          <p className="text-gray-600 mb-8">Por favor ingrese sus datos</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3D52D5] text-white py-2 px-4 rounded-md hover:bg-[#4A2418] transition duration-300"
            >
              Iniciar Sesion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;