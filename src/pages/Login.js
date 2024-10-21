import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_boutique.jpeg";

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#87563B" }}
    >
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center p-8 space-y-4 rounded shadow-md"
        style={{ backgroundColor: "#FEFDF8" }}
      >
        <img
          src={logo}
          alt="Logo Petshop Boutique"
          className="object-cover mx-auto mb-4"
        />
        <h3 className="font-semibold mb-4">ADMINISTRACIÓN</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className="border p-2 rounded w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
