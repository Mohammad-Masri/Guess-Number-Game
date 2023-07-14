/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider, withSnackbar } from "notistack";
import { Alert, Snackbar } from "@mui/material";

const errorHandlingToast = (
  msg: string | undefined,
  variant: "success" | "error" | "warning" | "info" | undefined
) => {
  const Display = withSnackbar((props: any) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event: any, reason: any) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose as any}
          severity={variant}
          color={variant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    );
  });

  const mountPoint = document.getElementById("error-handler-snackbar");
  ReactDOM.render(
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Display message={msg} variant={variant} />
    </SnackbarProvider>,
    mountPoint
  );
};

export const showSuccessSnackbarMessage = (msg: string) => {
  errorHandlingToast(msg, "success");
};

export const showErrorSnackbarMessage = (msg: string) => {
  errorHandlingToast(msg, "error");
};

export const showWarningSnackbarMessage = (msg: string) => {
  errorHandlingToast(msg, "warning");
};
