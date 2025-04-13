import { useEffect, useState } from "react";
import { useDeleteProductModal } from "@/store/useDeleteProductModal";
import { deleteProduct } from "../actions/delete-product";
import { useProductStore } from "@/store/useProductStore";

export const useDeleteProduct = () => {
    const { isOpen, product, closeModal } = useDeleteProductModal();
    const { removeProduct } = useProductStore();
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, closeModal]);

    const handleConfirmDelete = async() => {
        if (product) {
            setLoadingDelete(true)

            const result = await deleteProduct(product.id)
            
            if(result.success){
                //Notificar al componente TableProducts para que no muestre el producto eliminado
                removeProduct(product.id)
            }

            closeModal();
            setLoadingDelete(false)
        }
    };

    return {
        isOpen,
        loadingDelete,
        product,
        closeModal,
        handleConfirmDelete,
    };
};
