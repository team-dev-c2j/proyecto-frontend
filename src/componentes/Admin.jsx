import AddProduct from "./adminComponentes/AddProduct";
import ProductTable from "./adminComponentes/ProductTable";
import AddUnidad from "./adminComponentes/AddUnidad";
import AddMarca from "./adminComponentes/AddMarca";
import MarcasTable from "./adminComponentes/MarcasTable";


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
