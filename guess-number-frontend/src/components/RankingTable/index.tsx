import React from "react";
import { Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Table, { TableColumn } from "../Table";
import { TotalResult } from "../../dto/TotalResult";
export default function RankingTable() {
  const columns: TableColumn[] = [
    { id: "rank", label: "Rank" },
    {
      id: "name",
      label: "Name",
      align: "center",
    },
    {
      id: "score",
      label: "Score",
      align: "center",
    },
  ];

  const rows = [
    new TotalResult(1, "Mohammed", null, true),
    new TotalResult(2, "CPU 1", null, false),
    new TotalResult(3, "CPU 2", null, false),
    new TotalResult(4, "CPU 3", null, false),
    new TotalResult(5, "CPU 4", null, false),
  ];

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ height: 300 }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <StarIcon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <p
              style={{
                color: "#fff",
                fontSize: "large",
              }}
            >
              Ranking
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
