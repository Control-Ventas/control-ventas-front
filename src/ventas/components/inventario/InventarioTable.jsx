import MUIDataTable from "mui-datatables";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { useState, useEffect } from "react";
import ProductFormModal from "./ProductFormModal";
import Swal from "sweetalert2";
import { productsApi } from "../../../api/productsApi";

function InventarioTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [producto, setProducto] = useState({});
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        productsApi.get().then((response) => {
            setProductos(response.data);
        })
    }, [])

    const handleOpenModal = (productEdit) => {
        setProducto(productEdit);
        setIsModalOpen(true);
        console.log(producto);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (newProduct) => {
        if (newProduct.product_id == 0) {
            newProduct = {
                product_name: newProduct.product_name,
                description: newProduct.description,
                price: newProduct.price,
                stock: newProduct.stock
            }
            const { data: productoCreado } = await productsApi.post('/', newProduct);
            setProductos([...productos, productoCreado]);
            Swal.fire({
                title: "Producto agregado con exito",
                text: `El producto ${newProduct.product_name} ha sido agregado con exito`,
                icon: "success"
            });
        } else {
            const { data: productoEditado } = await productsApi.patch(`/${newProduct.product_id}`,
                {
                    product_name: newProduct.product_name,
                    description: newProduct.description,
                    price: newProduct.price,
                    stock: newProduct.stock
                });
            setProductos(productos.map((producto) =>
                producto.product_id === newProduct.product_id ? productoEditado : producto));
            Swal.fire({
                title: "Producto editado con exito",
                text: `El producto ${newProduct.product_name} ha sido editado con exito`,
                icon: "success"
            });
        }
        // Aquí puedes agregar la lógica para manejar el nuevo producto
    };

    const handleDeleteProducto = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setProductos(productos.filter((producto) => producto.product_id !== id));
                productsApi.delete(`/${id}`);
                Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
            }
        });
    };

    const columns = [
        {
            name: "ID",
            label: "ID",
            options: {
                filter: true,
            },
        },
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: true,
            },
        },
        {
            name: "description",
            label: "Descripción",
            options: {
                filter: true,
            },
        },
        {
            name: "price",
            label: "Precio",
            options: {
                filter: true,
            },
        },
        {
            name: "stock",
            label: "Stock",
            options: {
                filter: true,
            },
        },
        {
            name: "acciones",
            label: "Acciones",
            options: {
                filter: false, // Esto deshabilita el filtro para la columna de Acciones
                sort: false,   // También deshabilita la ordenación si no es necesario
            },
        },
    ];

    const options = {
        filterType: "checkbox",
        responsive: "standard",
        elevation: 2,
        selectableRows: "none",
        viewColumns: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
                columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
            },
            pagination: {
                next: "Siguiente Página",
                previous: "Página Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tabla",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "RESETEAR",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Esconder Columnas de la Tabla",
            },
            selectedRows: {
                text: "Fila(s) seleccionadas",
                delete: "Eliminar",
                deleteAria: "Eliminar Fila(s) Seleccionada",
            },
        },
        setTableProps: () => ({
            size: "small",
        }),
    };

    return (
        <div className="p-4 mt-5">
            <div className="flex justify-between items-center mx-5">
                <h1 className="text-3xl font-bold mb-4">Gestión de Inventario</h1>
                <button className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleOpenModal({})}>
                    <MdAddBusiness className="text-xl" />
                    Agregar Producto
                </button>
            </div>

            <div className="mx-14 mt-2">
                <MUIDataTable
                    title="Lista de Productos"
                    data={productos.map((product) => [
                        product.product_id,
                        product.product_name,
                        product.description || "N/A",
                        `$${product.price}`,
                        product.stock,
                        <div className="flex items-center gap-4" key={product.product_id}>
                            <button className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleOpenModal(product)}>
                                <FaEdit className="text-xl" />
                            </button>
                            <button className="text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteProducto(product.product_id)}>
                                <FaTrash className="text-xl" />
                            </button>
                        </div>,
                    ])}
                    columns={columns}
                    options={options}
                />
            </div>
            {isModalOpen && (<ProductFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                product={producto}
            />)}
        </div>
    );
}

export default InventarioTable;
