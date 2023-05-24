import { useAuthContext } from "./useAuthContext.js";
import { useUserContext } from "./useUserContext.js";
const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const logout = () => {
    // remove the user from local storage
    localStorage.removeItem("auth");

    // update the auth context
    userDispatch({ type: "REMOVE_USER" });
    dispatch({ type: "LOGOUT" });
  };

  return logout;
};

export default useLogout;
