import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewProduct from './pages/NewProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  const expiration = localStorage.getItem("expiration");
  if (!isAuthenticated || Date.now() > expiration) {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("expiration");
    return <Navigate to="/login" />;
  }
  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/administracion" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/new-product" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
        <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
