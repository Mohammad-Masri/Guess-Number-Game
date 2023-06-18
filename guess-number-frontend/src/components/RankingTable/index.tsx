import React from "react";
import { Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Table, { TableColumn } from "../Table";
import { TotalResult } from "../../dto/TotalResult";
import { useSelector } from "react-redux";
import { selectGame } from "../../store/slices/GameSlice";
import { PlayerResponse } from "../../dto/Player";
export default function RankingTable() {
  const columns: TableColumn[] = [
    { id: "rank", label: "Rank" },
    {
      id: "player",
      label: "Name",
      cell: (value: PlayerResponse) => (
        <>{value.is_you ? "You" : value.username}</>
      ),
    },
    {
      id: "score",
      label: "Score",
      align: "center",
    },
  ];

  const game = useSelector(selectGame);
  const playersResult = game != null ? game.players_result : [];

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
        <Table columns={columns} rows={playersResult} />
      </Grid>
    </Grid>
  );
}
