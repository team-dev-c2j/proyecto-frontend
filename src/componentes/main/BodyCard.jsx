import ProductsComponent from "./Products"
import WhatsAppIcon from "./Whatsapp";
import Marcas from "./marcas";


function BodyCard (){
    return(
        <div>
            <WhatsAppIcon></WhatsAppIcon>
            <Marcas></Marcas>
            <ProductsComponent></ProductsComponent>
        </div>
    )
}

export default BodyCard;