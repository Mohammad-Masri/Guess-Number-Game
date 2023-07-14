import React from "react";
import { Grid } from "@mui/material";
interface Props {
  icon?: React.ReactNode | null;
  label?: string | null;
}
export default function StatisticsCard({ icon, label }: Props) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        padding: 5,
        background: "linear-gradient(to right, #15191e, #1f2530)",
        border: "1px solid rgba(255, 253, 253, 0.253)",
        borderRadius: 12,
        height: 75,
      }}
    >
      <Grid item xs={2}>
        {icon != null ? icon : <></>}
      </Grid>
      <Grid item xs={8}>
        <p style={{ textAlign: "center", color: "#FFF" }}>
          {label != null ? label : <></>}
        </p>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
