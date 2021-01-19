import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { userRouters } from "./routers/routers";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth-context";
import { NavBar } from "./components/navbar";
import { Loader } from "./components/loader";

function App() {
  const { logout, login, token, userId, ready, userName } = useAuth();
  const isAuthenticated = !!token;
  const userAdmin = userId === "6006da9e61316e4505064842";
  const router = userRouters(isAuthenticated, userAdmin);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ logout, login, userName, token, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        {router}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
