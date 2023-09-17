import React from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de importar useAuth desde la ruta correcta
import VistasVendedores from "./VistasVendedores";
import ProductTable from "./productos/ProductTable";
import Vistas from "./Vistas";

function Admin() {
  const { userNav } = useAuth();
  console.log(userNav)
  return (
    <div>
      {userNav === `${import.meta.env.VITE_REACT_APP_USER_ADMIN}` ? (
        <Vistas></Vistas>
      ) : (
        <VistasVendedores/>
      )}

      <ProductTable></ProductTable>
    </div>
  );
}

export default Admin;
