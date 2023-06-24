import AddProduct from "./adminComponentes/AddProduct";
import ProductTable from "./adminComponentes/ProductTable";
import AddUnidad from "./adminComponentes/addUnidad";

function Admin() {

  return (
    <div>
      <AddProduct></AddProduct>
      <AddUnidad></AddUnidad>
      <ProductTable></ProductTable>
    </div>

  )

}

export default Admin;
