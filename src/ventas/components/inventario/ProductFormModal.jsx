import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";

function ProductFormModal({ isOpen, onClose, onSubmit, product }) {
    const dialogRef = useRef(null);

    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
            setProductId(product.product_id || 0);
            setProductName(product.product_name || '');
            setProductDescription(product.description || '');
            setProductPrice(product.price || '');
            setProductStock(product.stock || '');
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar los campos del formulario
        const newErrors = {};
        if (productName.trim() === '') {
            newErrors.productName = 'El nombre del producto es requerido';
        }
        if (productDescription.trim() === '') {
            newErrors.productDescription = 'La descripción del producto es requerida';
        }
        if (productPrice <= 0 || !/^\d+(\.\d{1,2})?$/.test(productPrice)) {
            newErrors.productPrice = 'El precio del producto es requerido y debe tener hasta dos decimales';
        }
        if (productStock <= 0 || !Number.isInteger(Number(productStock))) {
            newErrors.productStock = 'El stock del producto es requerido y debe ser un número entero';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrores(newErrors);
            return;
        }

        const newProduct = {
            product_id: productId,
            product_name: productName,
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
                    {product.product_id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
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
                        className={`mt-1 p-2 border w-full rounded-md
                ${errores.productName ? 'border-red-500' : ''}`}
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    {errores.productName && (
                        <p className="text-red-500 text-sm mt-1">{errores.productName}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        className={`mt-1 p-2 border w-full rounded-md
                ${errores.productDescription ? 'border-red-500' : ''}`}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                    {errores.productDescription && (
                        <p className="text-red-500 text-sm mt-1">{errores.productDescription}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className={`mt-1 p-2 border w-full rounded-md
                ${errores.productPrice ? 'border-red-500' : ''}`}
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    {errores.productPrice && (
                        <p className="text-red-500 text-sm mt-1">{errores.productPrice}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        className={`mt-1 p-2 border w-full rounded-md
                ${errores.productStock ? 'border-red-500' : ''}`}
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                    />
                    {errores.productStock && (
                        <p className="text-red-500 text-sm mt-1">{errores.productStock}</p>
                    )}
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
            ${product.product_id ? 'hover:bg-green-700 bg-green-600' : 'hover:bg-blue-700 bg-blue-600'}`}
                    >
                        {product.product_id ? 'Editar Producto' : 'Guardar Producto'}
                    </button>
                </div>
            </form>

        </dialog>
    );
}

export default ProductFormModal;
