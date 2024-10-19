import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Nistal12" && password === "Admin12") {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 1 día
      localStorage.setItem("authenticated", true);
      localStorage.setItem("expiration", expirationTime);
      navigate("/administracion");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
