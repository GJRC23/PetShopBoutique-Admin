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
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error al cargar el producto:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen del producto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecciona una categoría</option>
          <option value="Alimento">Alimento</option>
          <option value="Accesorio">Accesorio</option>
          <option value="Indumentaria">Indumentaria</option>
          <option value="Juguete">Juguete</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de animal</label>
        <select
          name="animalType"
          value={product.animalType}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecciona un tipo de animal</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isFeatured"
          checked={product.isFeatured}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Producto destacado</label>
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
