import { useNavigate } from "react-router-dom";
import Heading1 from "../../../components/texts/Heading1";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import Heading3 from "../../../components/texts/Heading3";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Loader from "../../../components/ui/Loader";
import Field from "../../../components/inputs/Field";
import { useCreateCategory } from "../hooks/useCreateCategory";
import FieldArea from "../../../components/inputs/FieldArea";

const CreateCategoryPage = () => {
    const navigate = useNavigate()
    const {loading, formData, updateField, handleCreateCategory} = useCreateCategory()

    return ( 
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); handleCreateCategory();}}>
            <div className="flex justify-between">
                <Heading1>Add Category</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary disabled={loading} onClick={()=>navigate("/categories")} type="button" className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary disabled={loading} type="submit" className="flex items-center gap-1">
                        {loading ? <Loader /> : <Heading4 className="text-white">Publish</Heading4>}
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
 
export default CreateCategoryPage;