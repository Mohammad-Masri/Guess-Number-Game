import React from "react";
import { Grid } from "@mui/material";
import StatisticsCard from "../StatisticsCard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getCurrentTime, makeTimeFormat } from "../../helpers/moment";
import { useSelector } from "react-redux";
import { selectGame } from "../../store/slices/GameSlice";

export default function StatisticsRow() {
  const game = useSelector(selectGame);
  const youPlayer = game != null ? game.you : null;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={5}
    >
      <Grid item xs={4}>
        <StatisticsCard
          label={youPlayer != null ? youPlayer.points + "" : ""}
          icon={<MilitaryTechIcon color="primary" fontSize="large" />}
        />
      </Grid>
      <Grid item xs={4}>
        <StatisticsCard
          label={youPlayer != null ? youPlayer.username : ""}
          icon={<PersonIcon color="primary" fontSize="large" />}
        />
      </Grid>
      <Grid item xs={4}>
        <StatisticsCard
          label={makeTimeFormat(getCurrentTime())}
          icon={<AccessTimeIcon color="primary" fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}
