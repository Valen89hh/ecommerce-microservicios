import React from "react";
import { CloudUpload, X } from "lucide-react";
import Heading3 from "../../../components/texts/Heading3";
import Card from "../../../components/ui/Card";
import Caption from "../../../components/texts/Caption";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import SmallText from "../../../components/texts/SmallText";
import type { HookProductImages } from "../hooks/useProductImages";

interface Props {
    hook: HookProductImages
}

const ProductImages: React.FC<Props> = ({
    hook
}) => {
    const {
        images,
        isDragging,
        fileInputRef,
        setIsDragging,
        handleChange,
        handleDrop,
        openFileDialog,
        removeImage,
    } = hook;
    return (
        <Card className="space-y-4">
            <Heading3>Product Images</Heading3>

            {images.length === 0 ? (
                // Área completa cuando no hay imágenes
                <div
                    className={`p-8 bg-background dark:bg-dark-background border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[200px] ${
                        isDragging
                            ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                            : "border-border dark:border-dark-border"
                    }`}
                    onClick={openFileDialog}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        ref={fileInputRef}
                        onChange={handleChange}
                    />
                    <CloudUpload className="text-muted dark:text-dark-muted" size={32} />
                    <Caption className="text-muted mt-2 dark:text-dark-muted">
                        Drag & Drop or Click to Upload Images
                    </Caption>
                    <Caption className="text-muted mt-1 dark:text-dark-muted font-normal text-[10px]">
                        JPG or PNG (max. 5MB)
                    </Caption>
                    <div className="mt-4">
                        <ButtonPrimary onClick={(e) => { e.stopPropagation(); openFileDialog(); }}>
                            <SmallText className="text-white dark:text-white">Select Images</SmallText>
                        </ButtonPrimary>
                    </div>
                </div>
            ) : (
                <>
                    {/* Grilla de imágenes + caja de carga al final */}
                    <div className="flex flex-wrap gap-4">
                        {images.map((image, index) => {
                            return (
                                <div key={index} className="relative group">
                                    <img
                                        src={image.previewUrl}
                                        alt={`preview-${index}`}
                                        className="w-[200px] h-[200px] object-cover rounded-lg border border-border dark:border-dark-border"
                                    />
                                    <button
                                        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hidden group-hover:block"
                                        onClick={() => removeImage(index)}
                                        title="Remove"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            );
                        })}

                        {/* Última tarjeta para seguir agregando */}
                        <div
                            className={`p-4 bg-background dark:bg-dark-background border-dashed border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors w-[200px] h-[200px] ${
                                isDragging
                                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                                    : "border-border dark:border-dark-border"
                            }`}
                            onClick={openFileDialog}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                ref={fileInputRef}
                                onChange={handleChange}
                            />
                            <CloudUpload className="text-muted dark:text-dark-muted" size={24} />
                            <Caption className="text-muted mt-2 text-center dark:text-dark-muted">
                                Add More Images
                            </Caption>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
};

export default ProductImages;
