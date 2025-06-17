/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/product/hooks/useCreateProduct.ts
import { useBasicInformation } from "./useBasicInformation";
import { useProductImages } from "./useProductImages";
import { usePriceAndStock } from "./usePriceAndStock";
import { useLogisticsInformation } from "./useLogisticsInformation";
import { useCertificates } from "./useCertificates";

export const useCreateProduct = () => {
  const basicInfo = useBasicInformation();
  const images = useProductImages();
  const priceStock = usePriceAndStock();
  const logistics = useLogisticsInformation();
  const certificates = useCertificates();

  const handleSubmit = async () => {
    try {
      // Validaciones opcionales aquí (por ejemplo: campos requeridos)
      if (!basicInfo.formData.name || images.images.length === 0) {
        alert("El nombre del producto e imágenes son obligatorios.");
        return;
      }

      const filteredCertificates = Object.fromEntries(
        Object.entries(certificates.certificates).filter(
          ([_, cert]) => cert.enabled
        )
      );

      const formPayload = {
        ...basicInfo.formData,
        ...priceStock.formData,
        ...logistics.logistics,
        images: images.images.map(img => img.file),
        certificates: filteredCertificates,
      };
      console.log("Payload final:", formPayload);

      // Aquí podrías hacer un POST a tu API:
      // await axios.post('/api/products', formPayload);

      alert("Producto creado exitosamente 🎉");

      // Opcional: resetear todo
      // resetAll();

    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  return {
    basicInfo,
    images,
    priceStock,
    logistics,
    certificates,
    handleSubmit,
  };
};
