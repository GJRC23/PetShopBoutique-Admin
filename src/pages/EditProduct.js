import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdateProduct = (updatedProduct) => {
    axios
      .put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then(() => {
        navigate("/"); // Redirige al Dashboard después de editar el producto
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
        alert(
          "Hubo un error al actualizar el producto. Por favor, intenta de nuevo."
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
          EDITAR PRODUCTO
        </h2>
        <div className="w-full max-w-lg">
          <ProductForm productId={id} onSubmit={handleUpdateProduct} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
