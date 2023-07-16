import AddProduct from "./productos/AddProduct";
import ProductTable from "./productos/ProductTable";
import AddUnidad from "./unidades/AddUnidad";
import AddMarca from "./marcas/AddMarca";
import MarcasTable from "./marcas/MarcasTable";
import Vistas from "./Vistas";


function Admin() {

  return (
    <div>
      <Vistas></Vistas>
      <AddMarca></AddMarca>
      <AddProduct></AddProduct>
      <AddUnidad></AddUnidad>
      <MarcasTable></MarcasTable>
      <ProductTable></ProductTable>
    </div>

  )

}

export default Admin;
