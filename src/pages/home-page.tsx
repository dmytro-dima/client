import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/loader";
import { Typography } from "@material-ui/core";

export const HomePage = () => {
  const { userName } = useContext(AuthContext);
  const { loading, error } = useHttp();

  if (loading) return <Loader />;
  if (error) return <Typography align="center">{error}</Typography>;

  return (
    <>
      <h1>{userName}</h1>
    </>
  );
};
