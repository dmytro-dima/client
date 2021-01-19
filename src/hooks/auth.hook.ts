import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  const login = useCallback(
    (jwtToken: string, id: string, name: string): void => {
      setToken(jwtToken);
      setUserId(id);
      setUserName(name);

      localStorage.setItem(
        storageName,
        JSON.stringify({ userId: id, token: jwtToken, name: name })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    setUserName("");
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData")!);

    if (data && data.userId) login(data.token, data.userId, data.name);
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, userName };
};
