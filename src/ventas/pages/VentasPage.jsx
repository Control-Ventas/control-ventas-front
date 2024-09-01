import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import ModalAgregarEditarCliente from "../components/ModalAgregarCliente";
import { FaRegAddressBook } from "react-icons/fa";
import Swal from "sweetalert2";
import { clientsApi } from "../../api/clientsApi";
import { productsApi } from "../../api/productsApi";
import { ventasApi } from "../../api/ventasApi";

function VentasPage() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    clientsApi.get().then((response) => {
      setClientes(response.data);
    });
    productsApi.get().then((response) => {
      setProductos(response.data);
      setProductosFiltrados(response.data);
    });
  }, []);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter((producto) =>
        producto.product_name
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      )
    );
  }, [productos, terminoBusqueda]);

  const seleccionarProducto = (producto) => {
    if (producto.stock <= 0) return;

    const productoExistente = productosSeleccionados.find(
      (p) => p.product_id === producto.product_id
    );

    if (productoExistente) {
      if (producto.stock > 0) {
        setProductosSeleccionados((prev) =>
          prev.map((p) =>
            p.product_id === producto.product_id
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          )
        );
        setProductos((prev) =>
          prev.map((p) =>
            p.product_id === producto.product_id
              ? { ...p, stock: p.stock - 1 }
              : p
          )
        );
      }
    } else {
      setProductos((prev) =>
        prev.map((p) =>
          p.product_id === producto.product_id
            ? { ...p, stock: p.stock - 1 }
            : p
        )
      );
      setProductosSeleccionados((prev) => [
        ...prev,
        { ...producto, cantidad: 1, stock: producto.stock - 1 },
      ]);
    }
  };

  const actualizarCantidadProducto = (id, cantidad) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) =>
        p.product_id === id
          ? {
              ...p,
              cantidad: p.cantidad + cantidad,
              stock: p.stock - cantidad,
            }
          : p
      )
    );

    setProductos((prev) =>
      prev.map((p) =>
        p.product_id === id ? { ...p, stock: p.stock - cantidad } : p
      )
    );
  };

  const disminuirCantidadProducto = (id) => {
    const productoExistente = productosSeleccionados.find(
      (p) => p.product_id === id
    );

    if (productoExistente.cantidad > 1) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.product_id === id
            ? { ...p, cantidad: p.cantidad - 1, stock: p.stock + 1 }
            : p
        )
      );

      setProductos((prev) =>
        prev.map((p) =>
          p.product_id === id ? { ...p, stock: p.stock + 1 } : p
        )
      );
    } else {
      eliminarProducto(id);
    }
  };

  const eliminarProducto = (id) => {
    const productoAEliminar = productosSeleccionados.find(
      (p) => p.product_id === id
    );

    setProductos((prev) =>
      prev.map((p) =>
        p.product_id === id
          ? { ...p, stock: p.stock + productoAEliminar.cantidad }
          : p
      )
    );

    setProductosSeleccionados((prev) =>
      prev.filter((p) => p.product_id !== id)
    );
  };

  const calcularTotal = () => {
    const total = productosSeleccionados.reduce(
      (total, producto) => total + producto.price * producto.cantidad,
      0
    );
    return parseFloat(total.toFixed(2));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAdd = async (cliente) => {
    try {
      const { data: clienteCreado } = await clientsApi.post("/", cliente);
      setClientes([...clientes, clienteCreado]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTerminarVenta = async () => {
    if (!clienteSeleccionado) {
      Swal.fire({
        title: "Error",
        text: "Debe seleccionar un cliente para finalizar la venta",
        icon: "error",
      });
      return;
    }

    const venta = {
      clientId: clienteSeleccionado.clientId,
      items: productosSeleccionados.map((producto) => ({
        productId: producto.product_id,
        quantity: producto.cantidad,
        price: producto.price,
      })),
    };

    try {
      const { data: ventaDB } = await ventasApi.post("/", venta);
      Swal.fire({
        title: `Venta #${ventaDB.id} Finalizada con Éxito`,
        icon: "success",
      }).then(() => {
        setClienteSeleccionado(null);
        setProductosSeleccionados([]);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al finalizar la venta",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-5 gap-4 p-4">
        {/* Sección de Clientes y Productos */}
        <div className="col-span-3 space-y-4 overflow-y-auto h-[calc(100vh-7rem)] p-3">
          {/* Sección de Clientes */}
          <div className="bg-white p-4 shadow-md rounded">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Clientes</h2>
              <button
                className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsModalOpen(true)}
              >
                <FaRegAddressBook className="text-xl" />
                Agregar Cliente
              </button>
            </div>
            <select
              className="w-full p-2 border rounded mb-4"
              onChange={(e) =>
                setClienteSeleccionado(
                  clientes.find(
                    (cliente) => cliente.clientId === parseInt(e.target.value)
                  )
                )
              }
              value={clienteSeleccionado ? clienteSeleccionado.clientId : ""}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.clientId} value={cliente.clientId}>
                  {cliente.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sección de Productos */}
          <div className="bg-white p-4 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Productos</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Buscar producto..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            <div
              className={
                productosFiltrados.length === 0
                  ? "text-center"
                  : "grid grid-cols-3 gap-4"
              }
            >
              {productosFiltrados.length === 0 ? (
                <p className="text-gray-500">
                  No se encontraron productos con el término de búsqueda
                  ingresado.
                </p>
              ) : (
                productosFiltrados.map((producto) => (
                  <div
                    key={producto.product_id}
                    className={`p-4 rounded shadow cursor-pointer ${
                      producto.stock <= 0
                        ? "bg-red-200"
                        : "bg-gray-100 hover:bg-blue-100"
                    }`}
                    onClick={() => seleccionarProducto(producto)}
                  >
                    <h3 className="text-lg font-bold">
                      {producto.product_name}
                    </h3>
                    <p>Precio: ${producto.price}</p>
                    <p>
                      Stock:{" "}
                      {producto.stock <= 0 ? "Sin stock" : producto.stock}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sección de Previsualización de Venta */}
        <div className="col-span-2 bg-white p-4 shadow rounded overflow-y-auto h-[calc(100vh-7rem)]">
          <h2 className="text-2xl font-bold mb-4">Previsualización de Venta</h2>
          {clienteSeleccionado ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">Cliente Seleccionado</h3>
                <p>
                  <span className="font-semibold">Nombre:</span>{" "}
                  {clienteSeleccionado.name}
                </p>
                <p>
                  <span className="font-semibold">Cédula:</span>{" "}
                  {clienteSeleccionado.ci}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {clienteSeleccionado.email}
                </p>
                <p>
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {clienteSeleccionado.phone}
                </p>
                <p>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {clienteSeleccionado.address}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">
              Seleccione un cliente para ver los detalles.
            </p>
          )}
          <h3 className="text-xl font-semibold mb-2">
            Productos Seleccionados
          </h3>
          <ul>
            {productosSeleccionados.map((producto, index) => (
              <li
                key={index}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>
                  {producto.product_name} - ${producto.price} x{" "}
                  {producto.cantidad}
                </span>
                <div className="flex justify-between gap-2">
                  <button
                    className="px-2 bg-blue-500 text-white rounded"
                    onClick={() =>
                      actualizarCantidadProducto(producto.product_id, 1)
                    }
                    disabled={producto.stock === 0}
                  >
                    <MdAdd />
                  </button>
                  <button
                    className="px-2 bg-red-500 text-white rounded"
                    onClick={() =>
                      disminuirCantidadProducto(producto.product_id)
                    }
                  >
                    <MdRemove />
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-500 text-white rounded"
                    onClick={() => eliminarProducto(producto.product_id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Total: ${calcularTotal()}</h3>
          </div>
          {/* Botón Finalizar Venta */}
          {productosSeleccionados.length > 0 && (
            <button
              className="w-full bg-green-500 text-white p-3 rounded mt-4"
              onClick={handleTerminarVenta}
            >
              Finalizar Venta
            </button>
          )}
        </div>
      </div>
      <ModalAgregarEditarCliente
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cliente={null}
        onAdd={onAdd}
        onEdit={null}
      />
    </>
  );
}

export default VentasPage;
