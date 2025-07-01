import React from "react";
import Card from "../../../components/ui/Card";
import Heading3 from "../../../components/texts/Heading3";
import FileUploadManager from "../../fileManager/components/FileUploadManager";

interface Props {
    hook: ReturnType<typeof import("../../fileManager/hooks/useUploadManager").useUploadManager>;
}


const ProductImages: React.FC<Props> = ({
    hook
}) => {

    return (
        <Card className="space-y-4">
            <Heading3>Product Images</Heading3>

            <FileUploadManager
                hook={hook}
            />
        </Card>
    );
};

export default ProductImages;
