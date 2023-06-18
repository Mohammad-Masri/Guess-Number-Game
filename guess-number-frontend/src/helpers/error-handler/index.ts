import { showErrorSnackbarMessage } from "../snackbar";

const getErrorMessageFromResponse = (error: any) => {
  return error.response.data.message || "Undefined Error!";
};

export const handleServerError = (error: any) => {
  const errorMessage = getErrorMessageFromResponse(error);
  showErrorSnackbarMessage(errorMessage);
};
