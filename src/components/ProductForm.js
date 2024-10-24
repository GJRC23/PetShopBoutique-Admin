import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ productId, onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    animalType: "",
    isVisible: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(
          `https://admin-petshop-boutique.vercel.app/api/products/${productId}`
        )
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.error("Error al cargar el producto:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Nombre del producto
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Descripción
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Precio
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder={formatCurrency(product.price)}
          required
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          URL de la imagen
        </label>
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Ingresa la URL de la imagen"
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Categoría
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="">Selecciona una categoría</option>
          <option value="Alimento">Alimento</option>
          <option value="Accesorio">Accesorio</option>
          <option value="Aseo">Aseo</option>
          <option value="Indumentaria">Indumentaria</option>
          <option value="Juguete">Juguete</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Tipo de animal
        </label>
        <select
          name="animalType"
          value={product.animalType}
          onChange={handleChange}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="">Selecciona un tipo de animal</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Otros">Otro</option>
        </select>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          name="isFeatured"
          checked={product.isFeatured}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-3 text-lg font-semibold text-gray-700">
          Producto destacado
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Guardar
      </button>
    </form>
  );
};

export default ProductForm;
