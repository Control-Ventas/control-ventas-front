import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";

function ProductFormModal({ isOpen, onClose, onSubmit, product }) {
    const dialogRef = useRef(null);

    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
            setProductId(product.id || 0);
            setProductName(product.name || '');
            setProductDescription(product.description || '');
            setProductPrice(product.price || '');
            setProductStock(product.stock || '');
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            stock: productStock,
        };
        onSubmit(newProduct);
        onClose(); // Cierra el modal después de enviar los datos
    };

    return (
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-lg w-11/12 md:w-1/2 p-5"
        >
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold mb-4">
                    {product.id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h2>
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 top-0"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        className="mt-1 p-2 border w-full rounded-md"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        className="mt-1 p-2 border w-full rounded-md"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="mt-1 p-2 border w-full rounded-md"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        className="mt-1 p-2 border w-full rounded-md"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md
                        ${product.id ? 'hover:bg-green-700 bg-green-600' : 'hover:bg-blue-700 bg-blue-600'}`}
                    >
                        {product.id ? 'Editar Producto' : 'Guardar Producto'}
                    </button>
                </div>
            </form>
        </dialog>
    );
}

export default ProductFormModal;
