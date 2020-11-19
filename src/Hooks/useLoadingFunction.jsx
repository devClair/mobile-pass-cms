import React, { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";

export const useLoadingFunction = () => {
  const dispatch = useDispatch();

  const loadingFunction = (isLoading) => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };

  return loadingFunction;
};

export default useLoadingFunction;
