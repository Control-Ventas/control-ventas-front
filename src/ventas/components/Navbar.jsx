import { IoIosLogOut } from "react-icons/io";
import { useAuthStore } from "../../hooks/useAuthStore";

const Navbar = () => {
  const { startLogout } = useAuthStore();

  const handleClick = () => {
    startLogout();
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-white text-2xl font-bold">Control de Ventas</h1>
      <button
        className="bg-white flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleClick}
      >
        <IoIosLogOut className="text-xl" />
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
