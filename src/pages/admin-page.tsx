import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { TableUsers } from "../components/table-users";
import { RegistrationWindow } from "../components/registration-window";
import { useHttp } from "../hooks/http.hook";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface StateRegistration {
  password: string;
  showP: boolean;
  passwordRepeat: string;
  showPR: boolean;
  email: string;
  name: string;
}

export const AdminPage = () => {
  const { error, loading, request, clearError } = useHttp();
  const [values, setValues] = useState<StateRegistration>({
    name: "",
    email: "",
    showP: false,
    showPR: false,
    password: "",
    passwordRepeat: "",
  });
  const [users, setUsers] = useState<User[]>([]);

  const registerHandler = async () => {
    const { name, email, password, passwordRepeat } = values;
    try {
      request(
        "/api/auth/registration",
        "POST",
        {
          name,
          email,
          password,
          passwordRepeat,
        },
        "registration"
      ).then(() => getUsers().then((data: User[]) => setUsers(data)));
      if (!error) {
        setValues({
          name: "",
          email: "",
          showP: false,
          showPR: false,
          password: "",
          passwordRepeat: "",
        });
      }
      clearError();
    } catch (err) {
      console.log("звязок з сервером відсутній");
    }
  };

  const getUsers = useCallback(async () => {
    try {
      return await request(`/api/auth/users`, "GET", null, "", {});
    } catch (e) {
      console.log("звязок з сервером відсутній");
    }
  }, [request]);

  useEffect(() => {
    getUsers().then((data: User[]) => setUsers(data));
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} className="border-primary border-1 mt-5">
        <RegistrationWindow
          values={values}
          setValues={setValues}
          loading={loading}
          error={error}
          registerHandler={registerHandler}
        />
        <Grid item xs={6}>
          <Grid container spacing={3} className="border-primary border-1 mt-5">
            <Grid item xs={12} className="d-flex justify-content-center">
              <Typography variant="h6">Users</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableUsers users={users} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
