import { Search } from "lucide-react";
import Field from "../../../components/inputs/Field";

const FieldSearch = () => {
    return ( 
        <Field
            placeholder="Search..."
            classNameContainer="bg-background dark:bg-dark-background h-10"
            className="placeholder:text-terciario dark:placeholder:text-dark-terciario"
            iconStart={
                <Search
                    size={18}
                    className="text-terciario dark:text-dark-terciario"

                />
            }
        />
     );
}
 
export default FieldSearch;