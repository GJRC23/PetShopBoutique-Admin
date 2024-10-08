import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdateProduct = (updatedProduct) => {
    axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then(() => {
        navigate('/'); // Redirige al Dashboard después de editar el producto
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un error al actualizar el producto. Por favor, intenta de nuevo.');
      });
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <ProductForm productId={id} onSubmit={handleUpdateProduct} />
    </div>
  );
};

export default EditProduct;
