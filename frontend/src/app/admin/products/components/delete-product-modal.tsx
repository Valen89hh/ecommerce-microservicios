"use client";

import { useDeleteProduct } from "../hooks/useDeleteProduct";

const DeleteProductModal = () => {
    const { isOpen, loadingDelete, product, closeModal, handleConfirmDelete } = useDeleteProduct();

    if (!isOpen || !product) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">¿Estás seguro?</h2>
        <p className="text-gray-600 mt-2">
          ¿Deseas eliminar el producto <strong>{product.name}</strong>?
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            disabled={loadingDelete}
            onClick={closeModal}
            className={`px-4 py-2 ${loadingDelete ? 'bg-gray-400' : 'bg-gray-200'} text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors`}
          >
            Cancelar
          </button>
          <button
            disabled={loadingDelete}
            onClick={handleConfirmDelete}
            className={`px-4 py-2 ${loadingDelete ? 'bg-gray-400' : 'bg-red-600'} text-white text-sm rounded hover:bg-red-700 transition-colors`}
          >
            {loadingDelete ? 'Eliminado...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
