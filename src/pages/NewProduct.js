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
      .post("https://backpetshopboutique.onrender.com/api/products", product)
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
      style={{
        backgroundImage: "url('/images/FondoDashboardAdmin.png')",
        backgroundColor: "#FBFBFD",
      }}
    >
      {/* Botón de regreso */}
      <div className="fixed left-4 top-4 z-20">
        <button
          onClick={() => navigate("/administracion")}
          className="text-6xl font-bold"
        >
          ←
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Encabezado sticky */}
        <div
          className="sticky top-0 z-10 w-full bg-opacity-90"
          style={{
            backgroundColor: "#FBFBFD",
          }}
        >
          <h2 className="text-3xl font-bold mb-4 mt-4 text-center">
            AGREGAR PRODUCTO
          </h2>
        </div>

        {/* Contenedor scrollable del formulario */}
        <div className="max-h-[60vh] overflow-y-auto w-full max-w-4xl p-4 ">
          <ProductForm onSubmit={handleCreateProduct} />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
