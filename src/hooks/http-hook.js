import { useState, useCallback } from "react";

const BACKEND_URL = "https://jsonplaceholder.typicode.com/posts";

export const useHttpClient = () => {
  const [error, setError] = useState();

  const sendRequest = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URL);

      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, sendRequest, clearError };
};
