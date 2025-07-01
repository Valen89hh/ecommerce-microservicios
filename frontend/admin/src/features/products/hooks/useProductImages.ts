import { useRef, useState } from "react";
import type { ProductImage } from "../schemas/Product";
import { api } from "../../../lib/axios";
import { generateUUID } from "../../../utils/uuid";

export interface HookProductImages {
    images: ProductImage[];
    isDragging: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    openFileDialog: () => void;
    removeImage: (id: string) => void;
    reorderImages: (newOrder: ProductImage[]) => void;
}

export const useProductImages = (initImages: ProductImage[] = []): HookProductImages => {
  const [images, setImages] = useState<ProductImage[]>(initImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (file: File, id: string) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Subiendo Imagen: ", file.name)
      const res = await api.post("/s3/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Respuesta Upload: ", res)
      const { url, path } = res.data.data;
      setImages(prev=>prev.map(img=>img.id != id ? img : {
        id: id,
        file: file,
        url: url,
        previewUrl: url,
        path: path,
        uploading: false
      }))
    } catch (error) {
      console.error("Upload failed", error);
      removeImage(id);
    }
  };

  const handleFiles = (files: File[]) => {
    const validImages = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    validImages.forEach(async (file) => {
      const previewUrl = URL.createObjectURL(file);
      const newImage: ProductImage = {
        id: generateUUID(),
        file,
        previewUrl,
        uploading: true,
      };
      // Primero agrega la imagen
      setImages((prev) => {
        const newImages = [...prev, newImage];
        return newImages;
      });

      console.log("Agregando imagen")
      await uploadImage(file, newImage.id)

    });
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

  const removeImage = async(id: string) => {
    try {
      setImages(prev=>prev.map(img=>img.id != id ? img : {
        ...img,
        uploading: false,
        deleting: true
      }))
      const img = images.find(img=>img.id == id)
      await api.post("/s3/delete", {
        paths: [img?.path]
      });
      setImages((prev) => prev.filter((pr) => pr.id !== id));
    } catch (error) {
      setImages((prev) => prev.filter((pr) => pr.id !== id));
      console.error("Delete failed", error);
    }
    
  };

  const reorderImages = (newOrder: ProductImage[]) => {
    setImages(newOrder);
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
    reorderImages,
  };
};
