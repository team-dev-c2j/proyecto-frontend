import React, { useState, useEffect } from "react";
import { deleteUserRequest, getUsersRequest } from "../../api/auth";
import "../../../styles/user.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmDelete) {
      deleteUserRequest(id)
        .then(() => {
          // Una vez que se ha eliminado el usuario con éxito, volvemos a obtener la lista actualizada de usuarios
          getUsersRequest()
            .then((response) => {
              setUsers(response);
            })
            .catch((error) => {
              console.error("Error al obtener los usuarios:", error);
            });
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
        });
    }
  };

  useEffect(() => {
    // Aquí obtenemos los usuarios con getUsersRequest y actualizamos el estado con los datos
    const fetchUsers = async () => {
      try {
        const response = await getUsersRequest();
        setUsers(response);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez, al montar el componente.

  return (
    <div className="tableMain">
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.username}
                <button className="buttonDelete" onClick={() => deleteUser(user._id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
