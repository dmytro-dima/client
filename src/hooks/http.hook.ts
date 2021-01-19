import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const defaultUrl: string = "http://localhost:5000";
  const request = useCallback(
    async (
      url: string,
      method: string = "Get",
      body: any | null = null,
      type: string,
      headers = {}
    ) => {
      setLoading(true);

      if (type === "registration") {
        if (body.password === body.passwordRepeat) {
          const { password, name, email } = body;

          body = {
            name,
            email,
            password,
          };
        } else {
          setError("паролі не співпадають");
        }
      }

      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      try {
        const response = await fetch(defaultUrl + url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Щось пішло не так!");
        }

        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => setError("");

  return { loading, error, request, clearError };
};
