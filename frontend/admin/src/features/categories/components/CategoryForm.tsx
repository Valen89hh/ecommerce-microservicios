import type React from "react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Field from "../../../components/inputs/Field";
import FieldArea from "../../../components/inputs/FieldArea";
import Heading1 from "../../../components/texts/Heading1";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";
import { useEditCategory } from "../hooks/useEditCategory";
import type { Category } from "../schemas/CategorySchema";
import { useNavigate } from "react-router-dom";

interface Props{
    category: Category
}

const CategoryForm: React.FC<Props> = ({
    category
}) => {
    const {loading, handleUpdateCategory, formData, updateField} = useEditCategory(category)
    const navigate = useNavigate()

    return ( 
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); handleUpdateCategory();}}>
            <div className="flex justify-between">
                <Heading1>Edit Category</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary disabled={loading} onClick={()=>navigate("/categories")} type="button" className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary disabled={loading} type="submit" className="flex items-center gap-1">
                        {loading ? <Loader /> : <Heading4 className="text-white">Update</Heading4>}
                    </ButtonPrimary>
                </div>
            </div>
            <Card className="space-y-2">
                <Heading3>Information</Heading3>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Name *</Heading4>
                        <Field
                            required
                            placeholder="Enter the product name"
                            value={formData.name}
                            onChange={(e)=>updateField("name", e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Description *</Heading4>
                    <FieldArea
                        required
                        placeholder="Enter the short description"
                        value={formData.description}
                        onChange={(e)=>updateField("description", e.target.value)}
                    />
                </div>
            </Card>
        </form>
     );
}
 
export default CategoryForm;