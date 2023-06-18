import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import StatisticsCard from "../StatisticsCard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getCurrentTime, makeTimeFormat } from "../../helpers/moment";
import { useSelector } from "react-redux";
import {
  selectGame,
  selectOldGame,
  selectRoundStatus,
} from "../../store/slices/GameSlice";
import { RoundStatuses } from "../../dto/Game";

export default function StatisticsRow() {
  const roundStatus = useSelector(selectRoundStatus);

  const game = useSelector(
    roundStatus == RoundStatuses.RUNNING ? selectOldGame : selectGame
  );
  const youPlayer = game != null ? game.you : null;

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = makeTimeFormat(getCurrentTime(), "HH:mm");
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          label={time}
          icon={<AccessTimeIcon color="primary" fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}
