import React, { useEffect, useState } from 'react';

function UsersComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
          console.log('ok')
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Llamada a la función para obtener los usuarios al cargar el componente
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <div>
                <li key={user.id}>{user.id}</li>
                <li key={user.name}>{user.name}</li>
            </div>

          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersComponent;
