import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ username, password }) => {
    dispatch(onChecking());

    console.log({ username, password });
    //TODO: Interactuar con Backend

    if (username !== "erick" || password !== "123") {
      dispatch(onLogout("Usuario o contraseña incorrectos"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      return;
    }

    dispatch(
      onLogin({
        name: "Erick Lasluisa",
        id: "123",
      })
    );
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startLogout,
  };
};
