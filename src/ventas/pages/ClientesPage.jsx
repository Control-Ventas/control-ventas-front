import MUIDataTable from "mui-datatables";
import { FaEdit, FaRegAddressBook, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

function ClientesPage() {
  const clientes = [
    {
      id: 1,
      nombre: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 1,
      nombre: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 1,
      nombre: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 1,
      nombre: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 1,
      nombre: "Cliente 1",
      email: "cliente1@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      email: "cliente2@example.com",
      telefono: "0982347297",
      cedula: "1726249442",
      direccion: "Quito",
    },
    // Agrega más clientes según sea necesario
  ];

  const columns = [
    "ID",
    "Nombre",
    "Cédula",
    "Email",
    "Teléfono",
    "Dirección",
    "Acciones",
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
      size: "small", // Reduce el tamaño de la tabla
    }),
  };

  return (
    <>
      <Navbar />
      <div className="p-4 mt-5">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-3xl font-bold mb-4">Gestión de Clientes</h1>
          <button className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FaRegAddressBook className="text-xl" />
            Agregar Cliente
          </button>
        </div>

        <div className="mx-14 mt-2">
          <MUIDataTable
            title="Lista de Clientes"
            data={clientes.map((cliente) => [
              cliente.id,
              cliente.nombre,
              cliente.cedula,
              cliente.email,
              cliente.telefono,
              cliente.direccion,
              <div className="flex items-center gap-4" key={cliente.id}>
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit className="text-xl" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash className="text-xl" />
                </button>
              </div>,
            ])}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
}

export default ClientesPage;
