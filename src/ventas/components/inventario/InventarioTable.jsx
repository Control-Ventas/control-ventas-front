import MUIDataTable from "mui-datatables";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import { useState } from "react";
import ProductFormModal from "./ProductFormModal";

const products = [
    { id: 1, name: "Producto 1", description: "Si", price: 100, stock: 10 },
    { id: 2, name: "Producto 2", price: 200, stock: 20 },
    { id: 3, name: "Producto 3", price: 300, stock: 30 },
    { id: 4, name: "Producto 4", price: 400, stock: 40 },
    { id: 5, name: "Producto 5", price: 500, stock: 50 },
];

function InventarioTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = (newProduct) => {
        console.log('Nuevo producto agregado:', newProduct);
        // Aquí puedes agregar la lógica para manejar el nuevo producto
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
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div className="flex items-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800"
                            onClick={handleOpenModal}>
                            <FaEdit className="text-xl" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                            <FaTrash className="text-xl" />
                        </button>
                    </div>
                ),
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
                    onClick={handleOpenModal}>
                    <MdAddBusiness className="text-xl" />
                    Agregar Producto
                </button>
            </div>

            <div className="mx-14 mt-2">
                <MUIDataTable
                    title="Lista de Productos"
                    data={products.map((product) => [
                        product.id,
                        product.name,
                        product.description || "N/A",
                        `$${product.price}`,
                        product.stock,
                    ])}
                    columns={columns}
                    options={options}
                />
            </div>
            {isModalOpen && (<ProductFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddProduct}
            />)}
        </div>
    );
}

export default InventarioTable;
