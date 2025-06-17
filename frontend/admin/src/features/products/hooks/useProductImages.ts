import { useRef, useState } from "react";
import type { ProductImage } from "../schemas/Product";

export interface HookProductImages {
    images: ProductImage[];
    isDragging: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    openFileDialog: () => void;
    removeImage: (index: number) => void;
}

export const useProductImages = (): HookProductImages => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (files: File[]) => {
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    const newImages: ProductImage[] = validImages.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const toRevoke = prev[index]?.previewUrl;
      if (toRevoke) URL.revokeObjectURL(toRevoke);
      return prev.filter((_, i) => i !== index);
    });
  };

  return {
    images,
    isDragging,
    fileInputRef,
    setIsDragging,
    handleChange,
    handleDrop,
    openFileDialog,
    removeImage,
  };
};
