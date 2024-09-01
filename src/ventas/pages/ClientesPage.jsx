import MUIDataTable from "mui-datatables";
import { FaEdit, FaRegAddressBook, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useState } from "react";
import ModalAgregarEditarCliente from "../components/ModalAgregarCliente";
import Swal from "sweetalert2";
import { clientsApi } from "../../api/clientsApi";
import { useEffect } from "react";

function ClientesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    clientsApi.get().then((response) => {
      setClientes(response.data);
    });
  }, []);

  const columns = [
    {
      name: "clientId",
      label: "ID",
    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "ci",
      label: "Cédula",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "phone",
      label: "Teléfono",
    },
    {
      name: "address",
      label: "Dirección",
    },
    {
      label: "Acciones",
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
      size: "small", // Reduce el tamaño de la tabla
    }),
  };

  const handleAddCliente = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAdd = async (cliente) => {
    console.log("Agregar cliente", cliente);

    try {
      const { data: clienteCreado } = await clientsApi.post("/", cliente);
      setClientes([...clientes, clienteCreado]);
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (id, cliente) => {
    try {
      const { data: clienteCreado } = await clientsApi.patch(`/${id}`, cliente);
      setClientes(
        clientes.map((c) =>
          c.clientId === id ? { ...c, ...clienteCreado } : c
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCliente = (id) => {
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
        try {
          clientsApi.delete(`/${id}`);
          setClientes(clientes.filter((cliente) => cliente.clientId !== id));
          Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "Ocurrió un error al intentar eliminar el cliente.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-4 mt-5">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-3xl font-bold mb-4">Gestión de Clientes</h1>
          <button
            className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleAddCliente}
          >
            <FaRegAddressBook className="text-xl" />
            Agregar Cliente
          </button>
        </div>

        <div className="mx-14 mt-2">
          <MUIDataTable
            title="Lista de Clientes"
            data={clientes.map((cliente) => [
              cliente.clientId,
              cliente.name,
              cliente.ci,
              cliente.email,
              cliente.phone,
              cliente.address,
              <div className="flex items-center gap-4" key={cliente.id}>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditCliente(cliente)}
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteCliente(cliente.clientId)}
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>,
            ])}
            columns={columns}
            options={options}
          />
        </div>
        <ModalAgregarEditarCliente
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cliente={selectedCliente}
          onAdd={onAdd}
          onEdit={onEdit}
        />
      </div>
    </>
  );
}

export default ClientesPage;
