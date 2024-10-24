import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const NewProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Hace scroll al inicio de la página
  }, []);

  const handleCreateProduct = (product) => {
    axios
      .post("https://admin-petshop-boutique.vercel.app/api/products", product)
      .then(() => {
        navigate("/administracion");
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
      className="min-h-screen bg-center bg-no-repeat bg-fixed bg-contain"
      style={{ backgroundColor: "#87563B" }}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={() => navigate("/administracion")}
          className="text-4xl font-bold md:text-6xl"
        >
          ←
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-center flex-1">
          AÑADIR PRODUCTO
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-[#FEFDF8] p-4 rounded-lg">
          <ProductForm onSubmit={handleCreateProduct} />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
