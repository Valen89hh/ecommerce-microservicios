import type React from "react";
import Field from "../../../components/inputs/Field";
import FieldArea from "../../../components/inputs/FieldArea";
import Select from "../../../components/inputs/Select";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import Tiptap from "../../../components/ui/Tiptap";
import type { HookBasicInformation } from "../hooks/useBasicInformation";

interface Props{
    hook: HookBasicInformation
}

const BasicInformation: React.FC<Props> = ({
    hook
}) => {
    const {formData, updateField, categories} = hook
    return ( 
        <Card className="space-y-2">
            <Heading3>Basic Information</Heading3>
            <div className="space-y-3">
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Product Name *</Heading4>
                    <Field
                        required
                        placeholder="Enter the product name"
                        value={formData.name}
                        onChange={(e)=>updateField("name", e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Category *</Heading4>
                    <Select
                        placeholder="Select Category"
                        selectedValue={formData.category}
                        onChange={(value)=>updateField("category", value)}
                        options={categories.map(ct=>({label: ct.name, value: ct.id.toString()}))}
                    />
                </div>
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Short Description *</Heading4>
                    <FieldArea
                        placeholder="Enter the short description"
                        value={formData.shortDescription}
                        onChange={(e)=>updateField("shortDescription", e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Heading4 className="text-muted dark:text-dark-muted">Full Description *</Heading4>
                    <Tiptap 
                        content={formData.fullDescription} 
                        onChange={(value)=>updateField("fullDescription", value)}
                    />
                </div>
            </div>
        </Card>
     );
}
 
export default BasicInformation;