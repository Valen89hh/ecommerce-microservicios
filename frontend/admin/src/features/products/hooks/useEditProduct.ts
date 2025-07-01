/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBasicInformation } from "./useBasicInformation";
import { usePriceAndStock } from "./usePriceAndStock";
import { useLogisticsInformation } from "./useLogisticsInformation";
import { useCertificates } from "./useCertificates";
import { useUploadManager } from "../../fileManager/hooks/useUploadManager";
import { useAuth } from "../../../providers/AuthProvider";
import { updateProduct } from "../services/productService";
import { toast } from "react-toastify";
import { useState } from "react";
import type { Product } from "../schemas/Product";
import { formatDateToString, getExtensionFromPath } from "../../../utils/utils";

export const useEditProduct = (product: Product) => {
  const basicInfo = useBasicInformation({
    name: product.name,
    category: product.category.id.toString(),
    shortDescription: product.shortDescription,
    fullDescription: product.fullDescription
  });
  const images = useUploadManager({ accept: ["image/"], initFiles: product.images.map(img=>({id: img.id.toString(), previewUrl: img.fileUrl, url: img.fileUrl, path: img.filePath, type: getExtensionFromPath(img.filePath)})) });
  const priceStock = usePriceAndStock({
    costPrice: product.costPrice,
    salePrice: product.salePrice,
    promotionalPrice: product.discountedPrice,
    stock: product.stock,
    maxStock: product.maxStock,
    minStock: product.minStock,
    unitAmount: product.unitAmount,
    unitsAvailable: product.availableUnits,
    unit: product.unitMeasurement
  });
  const logistics = useLogisticsInformation({
    weightKg: product.weight,
    length: product.length,
    width: product.width,
    height: product.height,
    isPerishable: product.isPerishable,
    expirationDate: formatDateToString(product.expirationDate),
    storageType: product.storageType,
    shippingUnit: product.shippingUnit
  });
  const certificates = useCertificates(product.certificates);
  const {user} = useAuth();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      // Validaciones opcionales aquí (por ejemplo: campos requeridos)
      if (!basicInfo.formData.name || images.files.length === 0) {
        toast.error("El nombre del producto e imágenes son obligatorios.");
        setLoading(false)
        return
      }
      
      if(!user){
        toast.error("El usuario no esta autenticado");
        setLoading(false)
        return
      }

    

    // 2. Filtrar certificados y subir archivos
    const filteredCertificates = certificates.certificates
      .filter(cr=>cr.files.length > 0 && cr.certifyingBody && cr.certificateNumber && cr.issueDate && cr.expirationDate)



      const formPayload = {
        "category_id": Number(basicInfo.formData.category),
        "employee_id": user!.id,
        "name": basicInfo.formData.name,
        "short_description": basicInfo.formData.shortDescription,
        "full_description": basicInfo.formData.fullDescription,
        "cost_price": Number(priceStock.formData.costPrice),
        "sale_price": Number(priceStock.formData.salePrice),
        "discounted_price": Number(priceStock.formData.promotionalPrice),
        "stock": Number(priceStock.formData.stock),
        "maximun_stock": Number(priceStock.formData.maxStock),
        "minimun_stock": Number(priceStock.formData.minStock),
        "unit_amount": Number(priceStock.formData.unitAmount),
        "available_units": Number(priceStock.formData.unitsAvailable),
        "unit_measurement": priceStock.formData.unit,
        "weight": Number(logistics.logistics.weightKg),
        "length": Number(logistics.logistics.length),
        "width": Number(logistics.logistics.width),
        "height": Number(logistics.logistics.height),
        "is_perceptible": logistics.logistics.isPerishable,
        "expiration_date": logistics.logistics.expirationDate,
        "storage_type": logistics.logistics.storageType,
        "shipping_unit": logistics.logistics.shippingUnit,
        "is_active": true,
        "images": images.files.filter(fl=>fl.path && fl.url).map(fl => {
          const result: any = {
            image_path: fl.path,
            image_url: fl.url
          };

          if (!isNaN(Number(fl.id))) {
            result.id = Number(fl.id);
          }

          return result;
        }),
        "certificates": filteredCertificates.map(cr=>{
          const result: any = {
            "certifying_body": cr.certifyingBody,
            "certificate_number": cr.certificateNumber,
            "issue_date": formatDateToString(cr.issueDate),
            "type": cr.type,
            "expiration_date": formatDateToString(cr.expirationDate),
            "files": cr.files.map(fl=>{
              const flResult: any = {
                "file_path": fl.filePath,
                "file_url": fl.fileUrl,
                "file_type":  fl.fileType
              }

              if (!isNaN(Number(fl.id))) {
                flResult.id = Number(fl.id);
              }

              return flResult;
            })
          }

          if (!isNaN(Number(cr.id))) {
            result.id = Number(cr.id);
          }

          return result;
        })
      }

      console.log("Payload final:", formPayload);
      const res = await updateProduct(formPayload, product.id)
      if(res.success){
       toast.success(res.message);
      }else{
        toast.error(res.error.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Hubo un error al actualizar el producto.");
    }
  };

  return {
    basicInfo,
    images,
    priceStock,
    logistics,
    certificates,
    handleSubmit,
    loading
  };
};
