import React from "react";
import { Button } from "@mui/material";
interface Props {
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
}
export default function MyButton({
  label,
  isDisabled = false,
  onClick = () => {},
}: Props) {
  const background = isDisabled
    ? "#bbb"
    : "linear-gradient(to right, #E2387B, #FB5F44)";

  return (
    <Button
      disabled={isDisabled}
      fullWidth
      onClick={onClick}
      sx={{
        background,
        color: "#FFF",
        "&:hover": {
          background,
        },
      }}
    >
      {label}
    </Button>
  );
}
