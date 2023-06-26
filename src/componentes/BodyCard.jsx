import CardProduct from "./CardProduct"
import WhatsAppIcon from "./Whatsapp";
import Marcas from "./marcas";


function BodyCard (){
    return(
        <div>
            <WhatsAppIcon></WhatsAppIcon>
            <Marcas></Marcas>
            <CardProduct></CardProduct>
        </div>
    )
}

export default BodyCard;