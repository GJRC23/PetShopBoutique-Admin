import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const NewProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = (product) => {
    axios
      .post("http://localhost:5000/api/products", product)
      .then(() => {
        navigate("/"); // Redirige al Dashboard después de agregar el producto
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
        alert(
          "Hubo un error al crear el producto. Por favor, intenta de nuevo."
        );
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/FondoDashboardAdmin.png')" }}
    >
      <div className="fixed left-4">
        <button onClick={() => navigate("/")} className="text-6xl font-bold">
          ←
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4 mt-4 text-center w-full">
          AGREGAR NUEVO PRODUCTO
        </h2>
        <div className="w-full max-w-lg">
          <ProductForm onSubmit={handleCreateProduct} />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
