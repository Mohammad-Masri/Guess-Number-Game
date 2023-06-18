import React from "react";
import { Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Table, { TableColumn } from "../Table";
import { useSelector } from "react-redux";
import { selectGame, selectRoundStatus } from "../../store/slices/GameSlice";
import { PlayerResponse } from "../../dto/Player";
import {
  PlayerGuessStatuses,
  RoundPlayerResultResponse,
} from "../../dto/RoundResult";
import { RoundStatuses } from "../../dto/Game";

const getRowColor = (row: RoundPlayerResultResponse) => {
  let color = "#000";
  switch (row.status) {
    case PlayerGuessStatuses.WIN: {
      color = "#44ed15";
      break;
    }
    case PlayerGuessStatuses.LOSE: {
      color = "red";
      break;
    }
    default:
      break;
  }
  return color;
};

export default function CurrentRoundCard() {
  const game = useSelector(selectGame);
  const roundStatus = useSelector(selectRoundStatus);

  console.log("roundStatus: ", roundStatus);

  const columns: TableColumn[] = [
    {
      id: "player",
      label: "Name",
      cell: (value: PlayerResponse, row: RoundPlayerResultResponse) => (
        <div style={{ color: getRowColor(row) }}>
          {value.is_you ? "You" : value.username}
        </div>
      ),
    },
    {
      id: "points",
      label: "Points",
      cell: (value: number, row: RoundPlayerResultResponse) => (
        <div style={{ color: getRowColor(row) }}>
          {roundStatus == RoundStatuses.RUNNING ? value : row.score}
        </div>
      ),
    },
    {
      id: "multiplier",
      label: "Multiplier",
      cell: (value: number, row: RoundPlayerResultResponse) => (
        <div style={{ color: getRowColor(row) }}>{value}</div>
      ),
    },
  ];

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
