import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const NewProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = (product) => {
    axios.post('http://localhost:5000/api/products', product)
      .then(() => {
        navigate('/'); // Redirige al Dashboard después de agregar el producto
      })
      .catch(error => {
        console.error('Error al crear el producto:', error);
        alert('Hubo un error al crear el producto. Por favor, intenta de nuevo.');
      });
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default NewProduct;
