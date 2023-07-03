import AddProduct from "./productos/AddProduct";
import ProductTable from "./productos/ProductTable";
import AddUnidad from "./unidades/AddUnidad";
import AddMarca from "./marcas/AddMarca";
import MarcasTable from "./marcas/MarcasTable";


function Admin() {

  return (
    <div>
      <AddMarca></AddMarca>
      <AddProduct></AddProduct>
      <AddUnidad></AddUnidad>
      <MarcasTable></MarcasTable>
      <ProductTable></ProductTable>
    </div>

  )

}

export default Admin;
