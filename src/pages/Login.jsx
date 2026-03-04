import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from "../context/ChatContext";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { setUserName } = useChat();
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  const cleanUser = user.trim();
  const cleanPass = pass.trim();

  if (cleanUser && cleanPass) {
    localStorage.setItem("ComunidadArtista_user", cleanUser);
    localStorage.removeItem("ComunidadArtista_messages"); // ✅ borrar historial
    setUserName(cleanUser);
    onLogin();
    navigate("/");
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Bienvenidos al Chat de la Comunidad de los Artistas</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p className='login-terms'>
          Al iniciar sesión, aceptas nuestros <a href="#">Términos y Condiciones</a> y nuestra <a href="#">Política de Privacidad</a>.
          <span className='login-link'>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></span>
        </p>
      </form>
    </div>
  );
};

export default Login;