import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";

import useFetch from "./useFetch";
export const useSignup = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { dispatch: userDispatch } = useUserContext();
  const { dispatch, auth } = useAuthContext();

  // USER FETCH: Fetch for getting user info from database
  const {
    error: userError,
    cancelFetch: userCancelFetch,
    performFetch: performFetchUser,
  } = useFetch(`/user/${auth?.id}`, (response) => {
    // Updating UserContext with: fetched User.
    userDispatch({ type: "SET_USER", payload: response.result });
    setIsSuccess(true);
  });

  // AUTH FETCH: Sign-up with user info. No Auth needed. Response will be the auth.
  const {
    isLoading,
    error: signupError,
    performFetch,
    cancelFetch,
  } = useFetch("/user/signup", (response) => {
    // Saving Token info into Local storage.
    localStorage.setItem("auth", JSON.stringify(response.result));
    // Updating AuthContext
    dispatch({ type: "LOGIN", payload: response.result });
  });

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
  const signup = async (
    email,
    password,
    firstName,
    lastName,
    birthday,
    country,
    bio
  ) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        birthday,
        country,
        bio,
      }),
    });
  };

  return { userError, signupError, isLoading, signup, isSuccess };
};
