import React from "react";
import { Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Table, { TableColumn } from "../Table";
import { RoundResult } from "../../dto/RoundResult";
export default function CurrentRoundCard() {
  const columns: TableColumn[] = [
    { id: "name", label: "Name" },
    {
      id: "points",
      label: "Points",
      align: "center",
    },
    {
      id: "multiplier",
      label: "Multiplier",
      align: "center",
    },
  ];

  const rows: RoundResult[] = [
    new RoundResult("Mohammed", null, null, true),
    new RoundResult("CPU 1", null, null),
    new RoundResult("CPU 2", null, null),
    new RoundResult("CPU 3", null, null),
    new RoundResult("CPU 4", null, null),
  ];

  return (
    <Grid container justifyContent="flex-start" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <EmojiEventsIcon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <p
              style={{
                color: "#fff",
                fontSize: "large",
              }}
            >
              Current Round
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table columns={columns} rows={rows} />
      </Grid>
    </Grid>
  );
}
