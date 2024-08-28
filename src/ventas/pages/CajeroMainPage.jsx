import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import Navbar from "../components/Navbar";
import { FaUsers, FaBoxes, FaCashRegister } from "react-icons/fa";

function CajeroMainPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-5 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          ¡Bienvenido {user.name}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-blue-100"
            onClick={() => {
              navigate("/clientes");
            }}
          >
            <FaUsers className="text-blue-600 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Gestionar Clientes
            </h2>
            <p className="text-gray-600">
              Administra la información de tus clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-blue-100">
            <FaBoxes className="text-blue-600 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Gestionar Inventario
            </h2>
            <p className="text-gray-600">Controla y organiza tu inventario.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-blue-100">
            <FaCashRegister className="text-blue-600 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ventas
            </h2>
            <p className="text-gray-600">Realiza y gestiona tus ventas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CajeroMainPage;
