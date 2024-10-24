import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo_boutique.jpeg";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    isFeatured: "",
    sortBy: "",
    sortOrder: "asc",
  });
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    axios
      .get("https://admin-petshop-boutique.vercel.app/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  };

  // Llamada a la API con filtros
  useEffect(() => {
    const fetchFilteredProducts = () => {
      const cleanFilters = {
        ...filters,
        name: filters.name || null,
        category: filters.category || null,
        isFeatured: filters.isFeatured !== "Todos" ? filters.isFeatured : null,
        sortBy: filters.sortBy || "name",
        sortOrder: filters.sortOrder || "asc",
      };

      axios
        .get("https://admin-petshop-boutique.vercel.app/api/products", {
          params: cleanFilters,
        })
        .then((response) => setProducts(response.data))
        .catch((error) =>
          console.error("Error al obtener los productos:", error)
        );
    };

    fetchFilteredProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value !== "" ? e.target.value : undefined,
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      category: "",
      animalType: "",
      isFeatured: "",
      sortBy: "",
      sortOrder: "asc",
    });
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      axios
        .delete(
          `https://admin-petshop-boutique.vercel.app/api/products/${productToDelete}`
        )
        .then(() => {
          setProducts(
            products.filter((product) => product._id !== productToDelete)
          );
          setShowModal(false);
          setProductToDelete(null);
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("expiration");
    window.location.href = "/login"; // Redirige al login
  };

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-fixed bg-contain"
      style={{ backgroundColor: "#87563B" }}
    >
      <div
        className={`bg-white p-6 rounded-lg max-w-6xl mx-auto shadow-lg ${
          showModal ? "pointer-events-none opacity-50" : ""
        }`}
        style={{ backgroundColor: "#FEFDF8" }}
      >
        <button
          onClick={handleLogout}
          className="logout-button font-semibold text-sm sm:text-base"
        >
          CERRAR SESIÓN
        </button>
        <img
          src={logo}
          alt="Logo Petshop Boutique"
          className="w-48 h-48 object-cover mx-auto mb-4"
        />
        <div
          className="sticky top-0 z-10 pb-4 bg-white"
          style={{ backgroundColor: "#FEFDF8" }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-8 text-center">
            ADMINISTRACIÓN DE PRODUCTOS
          </h2>

          <div className="overflow-x-auto mb-2">
            <div className="flex flex-wrap space-x-2 sm:space-x-3 justify-center mb-2">
              <button onClick={resetFilters} className="p-2 rounded">
                <FontAwesomeIcon icon={faSyncAlt} />
              </button>
              <input
                type="text"
                name="name"
                placeholder="Buscar por nombre"
                value={filters.name}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              />
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              >
                <option value="">Categorías</option>
                <option value="Alimento">Alimento</option>
                <option value="Accesorio">Accesorio</option>
                <option value="Aseo">Aseo</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Juguete">Juguete</option>
              </select>
              <select
                name="animalType"
                value={filters.animalType}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              >
                <option value="">Animales</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Otros">Otros</option>
              </select>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              >
                <option value="">Ordenar Por</option>
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
              </select>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
              <select
                name="isFeatured"
                value={filters.isFeatured}
                onChange={handleFilterChange}
                className="border p-2 w-full sm:w-auto"
              >
                <option value="">Todos</option>
                <option value="true">Destacados</option>
                <option value="false">No destacados</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/new-product"
              className="bg-green-500 text-white px-4 py-2 rounded font-semibold border border-transparent
               hover:bg-transparent hover:text-green-500 hover:border-green-500 transition-all duration-300"
            >
              + NUEVO PRODUCTO
            </Link>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full my-4 border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-center">
                  Imagen
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Nombre
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Descripción
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Precio
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Categoría
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Destacado
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) &&
                products.map((product) => (
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
                      {formatCurrency(product.price)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.isFeatured ? "✔️" : "❌"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <div className="flex space-x-2 justify-center">
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-transparent hover:text-blue-500 border-2 border-blue-500 transition duration-300"
                        >
                          EDITAR
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-transparent hover:text-red-500 border-2 border-red-500 transition duration-300"
                        >
                          ELIMINAR
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 pointer-events-auto"
          onClick={() => setShowModal(false)} // Cierra el modal si se hace clic fuera de él
        >
          <div
            className="bg-white p-6 rounded shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
          >
            <p className="text-xl mb-4">
              ¿Estás seguro de que deseas eliminar este producto?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 pointer-events-auto"
          onClick={closeImagePopup}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Producto"
              style={{
                maxWidth: "375px",
                maxHeight: "80vh",
                width: "auto",
                height: "auto",
              }}
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
