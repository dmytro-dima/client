import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import EmailIcon from "@material-ui/icons/Email";
import { AuthContext } from "../context/auth-context";
import { useHttp } from "../hooks/http.hook";

interface StateRegistration {
  password: string;
  showP: boolean;
  passwordRepeat: string;
  showPR: boolean;
  email: string;
  name: string;
}

export const RegistrationPage = () => {
  const { login } = useContext(AuthContext);
  const { error, loading, request, clearError } = useHttp();
  const [values, setValues] = useState<StateRegistration>({
    name: "",
    email: "",
    showP: false,
    showPR: false,
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (prop: keyof StateRegistration) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (showPassword: keyof StateRegistration) => {
    setValues({ ...values, [showPassword]: !values[showPassword] });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
      ).then(({ userId, token, name }) => login(token, userId, name));
      clearError();
    } catch (err) {
      console.log("звязок з сервером відсутній");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} className="border-primary border-1 mt-5">
        <Grid item xs={12} className="d-flex justify-content-center">
          <Typography variant="h6">Реєстрація</Typography>
        </Grid>
        {error && (
          <Typography
            variant="body1"
            className="text-danger ml-3 mt-auto mb-auto"
          >
            {error}
          </Typography>
        )}
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showP ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("showP")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showP ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPR ? "text" : "password"}
              value={values.passwordRepeat}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("showPR")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showP ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            onClick={() => registerHandler()}
          >
            Зареєструватись
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
