import React from "react";
import {
  Button,
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
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface StateRegistration {
  password: string;
  showP: boolean;
  passwordRepeat: string;
  showPR: boolean;
  email: string;
  name: string;
}

interface RegistrationProps {
  values: StateRegistration;
  setValues: (values: StateRegistration) => void;
  loading: boolean;
  error: string | null;
  registerHandler: () => void;
}

export const RegistrationWindow: React.FC<RegistrationProps> = ({
  values,
  setValues,
  error,
  loading,
  registerHandler,
}) => {
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

  return (
    <Grid item xs={6}>
      <Grid container spacing={3} className="border-primary border-1 mt-5">
        <Grid item xs={12} className="d-flex justify-content-center">
          <Typography variant="h6">Добавити користувача</Typography>
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
              onChange={handleChange("passwordRepeat")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("showPR")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPR ? <Visibility /> : <VisibilityOff />}
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
            Добавити новго користувача
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
