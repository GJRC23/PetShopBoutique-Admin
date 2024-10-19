import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateProduct = (updatedProduct) => {
    axios
      .put(
        `https://backpetshopboutique.onrender.com/api/products/${id}`,
        updatedProduct
      )
      .then(() => {
        navigate("/administracion");
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
      className="min-h-screen bg-center bg-no-repeat bg-fixed bg-contain"
      style={{
        backgroundImage: "url('/images/FondoDashboardAdmin.png')",
        backgroundColor: "#FBFBFD",
      }}
    >
      <div className="fixed left-4 top-4 z-20">
        <button
          onClick={() => navigate("/administracion")}
          className="text-6xl font-bold"
        >
          ←
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div
          className="sticky top-0 z-10 w-full bg-opacity-90"
          style={{
            backgroundColor: "#FBFBFD",
          }}
        >
          <h2 className="text-3xl font-bold mb-4 mt-4 text-center">
            EDITAR PRODUCTO
          </h2>
        </div>

        <div className="max-h-[60vh] overflow-y-auto w-full max-w-4xl p-4 ">
          <ProductForm productId={id} onSubmit={handleUpdateProduct} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
