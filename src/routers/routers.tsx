import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "../pages/auth-page";
import { HomePage } from "../pages/home-page";
import { RegistrationPage } from "../pages/registration-page";
import { AdminPage } from "../pages/admin-page";

export const userRouters = (isAuthenticated: boolean, adminUser: boolean) => {
  if (isAuthenticated) {
    //routers for logged in users
    return (
      <Switch>
        <Route path="/" exact>
          {!adminUser ? <HomePage /> : <AdminPage />}
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  // routers for login users
  return (
    <Switch>
      <Route path="/login" exact>
        <AuthPage />
      </Route>
      <Route path="/registration" exact>
        <RegistrationPage />
      </Route>
      <Redirect to="login/" />
    </Switch>
  );
};
