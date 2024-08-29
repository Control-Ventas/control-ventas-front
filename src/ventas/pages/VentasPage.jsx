import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import ModalAgregarEditarCliente from "../components/ModalAgregarCliente";
import { FaRegAddressBook } from "react-icons/fa";
import Swal from "sweetalert2";

function VentasPage() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Cliente 1",
      cedula: "1234567890",
      email: "cliente1@example.com",
      telefono: "0987654321",
      direccion: "Dirección 1",
    },
    {
      id: 2,
      nombre: "Cliente 2",
      cedula: "0987654321",
      email: "cliente2@example.com",
      telefono: "0123456789",
      direccion: "Dirección 2",
    },
  ]);

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Producto 1", precio: 10, stock: 20 },
    { id: 2, nombre: "Producto 2", precio: 15, stock: 15 },
    { id: 3, nombre: "Producto 3", precio: 10, stock: 20 },
    { id: 4, nombre: "Producto 4", precio: 15, stock: 15 },
    { id: 5, nombre: "Producto 5", precio: 10, stock: 20 },
    { id: 6, nombre: "Producto 6", precio: 15, stock: 15 },
  ]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(productos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      )
    );
  }, [productos, terminoBusqueda]);

  const seleccionarProducto = (producto) => {
    if (producto.stock <= 0) return;

    const productoExistente = productosSeleccionados.find(
      (p) => p.id === producto.id
    );

    if (productoExistente) {
      if (producto.stock > 0) {
        setProductosSeleccionados((prev) =>
          prev.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          )
        );
        setProductos((prev) =>
          prev.map((p) =>
            p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
          )
        );
      }
    } else {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
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
        p.id === id
          ? {
              ...p,
              cantidad: p.cantidad + cantidad,
              stock: p.stock - cantidad,
            }
          : p
      )
    );

    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock - cantidad } : p))
    );
  };

  const disminuirCantidadProducto = (id) => {
    const productoExistente = productosSeleccionados.find((p) => p.id === id);

    if (productoExistente.cantidad > 1) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, cantidad: p.cantidad - 1, stock: p.stock + 1 }
            : p
        )
      );

      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 1 } : p))
      );
    } else {
      eliminarProducto(id);
    }
  };

  const eliminarProducto = (id) => {
    const productoAEliminar = productosSeleccionados.find((p) => p.id === id);

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock + productoAEliminar.cantidad } : p
      )
    );

    setProductosSeleccionados((prev) => prev.filter((p) => p.id !== id));
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onAdd = (cliente) => {
    //TODO: Implementar backend
    console.log("Agregar cliente", cliente);
    setClientes([...clientes, { id: clientes.length + 1, ...cliente }]);
  };

  const handleTerminarVenta = () => {
    //TODO: Implementar backend
    Swal.fire({
      title: "Venta Finalizada con Éxito",
      icon: "success",
    });
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
                    (cliente) => cliente.id === parseInt(e.target.value)
                  )
                )
              }
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
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
                    key={producto.id}
                    className={`p-4 rounded shadow cursor-pointer ${
                      producto.stock <= 0
                        ? "bg-red-200"
                        : "bg-gray-100 hover:bg-blue-100"
                    }`}
                    onClick={() => seleccionarProducto(producto)}
                  >
                    <h3 className="text-lg font-bold">{producto.nombre}</h3>
                    <p>Precio: ${producto.precio}</p>
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
                  {clienteSeleccionado.nombre}
                </p>
                <p>
                  <span className="font-semibold">Cédula:</span>{" "}
                  {clienteSeleccionado.cedula}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {clienteSeleccionado.email}
                </p>
                <p>
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {clienteSeleccionado.telefono}
                </p>
                <p>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {clienteSeleccionado.direccion}
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
                  {producto.nombre} - ${producto.precio} x {producto.cantidad}
                </span>
                <div className="flex justify-between gap-2">
                  <button
                    className="px-2 bg-blue-500 text-white rounded"
                    onClick={() => actualizarCantidadProducto(producto.id, 1)}
                    disabled={producto.stock === 0}
                  >
                    <MdAdd />
                  </button>
                  <button
                    className="px-2 bg-red-500 text-white rounded"
                    onClick={() => disminuirCantidadProducto(producto.id)}
                  >
                    <MdRemove />
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-500 text-white rounded"
                    onClick={() => eliminarProducto(producto.id)}
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
