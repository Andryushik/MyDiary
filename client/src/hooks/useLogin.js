import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

export const useLogin = () => {
  const { dispatch: userDispatch } = useUserContext();
  const { dispatch, auth } = useAuthContext();
  const navigate = useNavigate();

  // USER FETCH: Fetch for getting user info from database
  const {
    error: userError,
    cancelFetch: userCancelFetch,
    performFetch: performFetchUser,
  } = useFetch(`/user/${auth?.id}`, (response) => {
    // Updating UserContext with: fetched User.
    userDispatch({ type: "SET_USER", payload: response.result });
    navigate("/my-posts");
  });

  // AUTH FETCH: Login with Email and password. No Auth needed. Response will be the auth.
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/login",
    (response) => {
      // Saving Token info into Local storage.
      localStorage.setItem("auth", JSON.stringify(response.result));
      // Setting AuthContext
      dispatch({ type: "LOGIN", payload: response.result });
    }
  );

  useEffect(() => {
    // Get user from database only when there is Auth.
    if (auth) {
      performFetchUser();
    }
    return userCancelFetch;
  }, [auth]);

  useEffect(() => {
    return cancelFetch;
  }, []);

  //Setting Fetch for AUTH FETCH
  const login = async (email, password) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  return { userError, error, isLoading, login };
};
