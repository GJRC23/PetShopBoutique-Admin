import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <Link to="/new-product">Agregar Producto</Link>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price} USD
            <Link to={`/edit-product/${product._id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
