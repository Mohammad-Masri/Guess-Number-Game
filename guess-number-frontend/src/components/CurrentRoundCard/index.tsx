import React from "react";
import { Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Table, { TableColumn } from "../Table";
import { useSelector } from "react-redux";
import { selectGame } from "../../store/slices/GameSlice";
import { PlayerResponse } from "../../dto/Player";
export default function CurrentRoundCard() {
  const columns: TableColumn[] = [
    {
      id: "player",
      label: "Name",
      cell: (value: PlayerResponse) => (value.is_you ? "You" : value.username),
    },
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

  const game = useSelector(selectGame);

  const currentRound = game != null ? game.current_round : null;
  const roundResults = currentRound != null ? currentRound.round_results : [];

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
        <Table columns={columns} rows={roundResults} />
      </Grid>
    </Grid>
  );
}
