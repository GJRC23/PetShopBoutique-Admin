import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    isFeatured: "",
    sortBy: "name", // predeterminado a 'name'
    sortOrder: "asc", // predeterminado a 'ascendente'
  });
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
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
        .get("http://localhost:5000/api/products", { params: cleanFilters })
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
      sortBy: "name",
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
        .delete(`http://localhost:5000/api/products/${productToDelete}`)
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
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Buscar por nombre"
            value={filters.name}
            onChange={handleFilterChange}
            className="border p-2"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border p-2"
          >
            <option value="">Todas las categorías</option>
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
            className="border p-2"
          >
            <option value="">Todos los animales</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otros">Otros</option>
          </select>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="border p-2"
          >
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleFilterChange}
            className="border p-2"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select
            name="isFeatured"
            value={filters.isFeatured}
            onChange={handleFilterChange}
            className="border p-2"
          >
            <option value="">Todos</option>
            <option value="true">Destacados</option>
            <option value="false">No destacados</option>
          </select>
          <button onClick={resetFilters} className="p-2 bg-gray-200 rounded">
            RESET
          </button>
        </div>
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
                Destacado
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
                  {formatCurrency(product.price)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {product.category}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {product.isFeatured ? "✔️" : "❌"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="text-blue-500"
                  >
                    O Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product._id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
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
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeImagePopup}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Producto"
              style={{
                maxWidth: "600px",
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
