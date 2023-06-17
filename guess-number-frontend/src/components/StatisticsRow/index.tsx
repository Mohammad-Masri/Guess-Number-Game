import React from "react";
import { Grid } from "@mui/material";
import StatisticsCard from "../StatisticsCard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Player } from "../../dto/Player";
import { getCurrentTime, makeTimeFormat } from "../../helpers/moment";

const currentPlayer = new Player("Mohammed", 1000);

export default function StatisticsRow() {
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
          label={currentPlayer.points + ""}
          icon={<MilitaryTechIcon color="primary" fontSize="large" />}
        />
      </Grid>
      <Grid item xs={4}>
        <StatisticsCard
          label={currentPlayer.name}
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
