import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";

export const Loader = () => {
  return (
    <div className="d-flex">
      <Container maxWidth="sm" className="mt-3 d-flex justify-content-center">
        <CircularProgress />
      </Container>
    </div>
  );
};
