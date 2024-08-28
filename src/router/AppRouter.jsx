import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import CajeroMainPage from "../ventas/pages/CajeroMainPage";
import { useAuthStore } from "../hooks/useAuthStore";
import ClientesPage from "../ventas/pages/ClientesPage";
import InventarioPage from "../ventas/pages/InventarioPage";

function AppRouter() {
  const { status } = useAuthStore();

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CajeroMainPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/inventario" element={<InventarioPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRouter;
