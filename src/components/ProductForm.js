import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ productId, onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    isVisible: true
  });

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/api/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error al cargar el producto:', error));
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre del producto" required />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Descripción" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Precio" required />
      <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="URL de la imagen" />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Categoría" />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
