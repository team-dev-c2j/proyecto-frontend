import React, { useEffect, useState } from "react";

function ProductsComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/products");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.results);
          console.log("ok");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Llamada a la función para obtener los usuarios al cargar el componente
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      {users.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <div>
              <li key={user._id}>{user._id}</li>
              <li key={user.title}>{user.title}</li>
              <li key={user.size}>{user.size}</li>
              <li key={user.stock}>{user.stock}</li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsComponent;
