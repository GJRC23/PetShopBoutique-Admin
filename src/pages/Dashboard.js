import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener la lista de productos desde el backend
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          // Actualiza la lista de productos después de eliminar uno
          setProducts(products.filter(product => product._id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar el producto:', error);
          alert('Hubo un error al eliminar el producto. Por favor, intenta de nuevo.');
        });
    }
  };

  return (
    <div>
      <h2>Panel de Administración de Productos</h2>
      <Link to="/new-product">Agregar Nuevo Producto</Link>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price} USD</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/edit-product/${product._id}`}>Editar</Link>
                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
