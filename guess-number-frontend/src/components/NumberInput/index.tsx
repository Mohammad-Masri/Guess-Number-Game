import React from "react";
import "./index.css";
import { Grid, IconButton } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
interface Props {
  label: string;
  id: string;
  value: number;
  setValue: (number: number) => void;
  stepAmount: number;
  min: number;
  max: number;
}
export default function NumberInput({
  label,
  id,
  value,
  min,
  max,
  stepAmount,
  setValue,
}: Props) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  const handleClickIncreaseButton = () => {
    const newValue = value + stepAmount;
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };
  const handleClickDecreaseButton = () => {
    const newValue = value - stepAmount;
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        background: "linear-gradient(to right, #15191e, #1f2530)",
        borderRadius: 12,
        border: "1px solid rgba(255, 253, 253, 0.253)",
      }}
    >
      <Grid xs={12}>
        <p
          style={{
            textAlign: "center",
            color: "#6c7180",
            fontSize: "xx-small",
          }}
        >
          {label}
        </p>
      </Grid>
      <Grid xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton aria-label="down" onClick={handleClickDecreaseButton}>
              <ArrowCircleDown sx={{ color: "#FFF" }} />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <input
              id={id}
              className="number-input"
              value={value}
              onChange={handleValueChange}
              type="number"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="up" onClick={handleClickIncreaseButton}>
              <ArrowCircleUpIcon sx={{ color: "#FFF" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
