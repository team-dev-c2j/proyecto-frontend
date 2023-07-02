import AddProduct from "./adminComponentes/productos/AddProduct";
import ProductTable from "./adminComponentes/productos/ProductTable";
import AddUnidad from "./adminComponentes/AddUnidad";
import AddMarca from "./adminComponentes/marcas/AddMarca";
import MarcasTable from "./adminComponentes/marcas/MarcasTable";


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
