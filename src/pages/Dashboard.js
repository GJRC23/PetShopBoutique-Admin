import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product._id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          alert(
            "Hubo un error al eliminar el producto. Por favor, intenta de nuevo."
          );
        });
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/FondoDashboardAdmin.png')" }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg max-w-6xl mx-auto shadow-lg h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ADMINISTRACIÓN DE PRODUCTOS
        </h2>
        <Link to="/new-product" className="text-green-500">
          + Agregar Nuevo Producto
        </Link>
        <table className="w-full my-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-center">Imagen</th>
              <th className="border border-gray-300 p-2 text-center">Nombre</th>
              <th className="border border-gray-300 p-2 text-center">
                Descripción
              </th>
              <th className="border border-gray-300 p-2 text-center">Precio</th>
              <th className="border border-gray-300 p-2 text-center">
                Categoría
              </th>
              <th className="border border-gray-300 p-2 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2 text-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover mx-auto cursor-pointer"
                    onClick={() => handleImageClick(product.imageUrl)}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {product.name}
                </td>
                <td className="border border-gray-300 p-2 text-center w-48 max-w-xs whitespace-normal break-words overflow-hidden">
                  {product.description}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {product.price} USD
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {product.category}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="text-blue-500"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 ml-2"
                  >
                    X Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeImagePopup}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Producto"
              style={{ maxWidth: '600px', maxHeight: '80vh', width: 'auto', height: 'auto' }}
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 focus:outline-none"
              onClick={closeImagePopup}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
