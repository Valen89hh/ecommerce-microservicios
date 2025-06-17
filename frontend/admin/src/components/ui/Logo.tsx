import { Leaf } from "lucide-react";
import Heading1 from "../texts/Heading1";

const Logo = () => {
    return ( 
        <div className="flex items-center gap-2 text-white">
            <Leaf/>
            <Heading1 className="text-white">
                NaturaSalud
            </Heading1>
        </div>
     );
}
 
export default Logo;