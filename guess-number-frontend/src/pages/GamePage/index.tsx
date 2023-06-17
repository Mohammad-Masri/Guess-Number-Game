import React, { useState } from "react";
import WelcomeCard from "../../components/WelcomeCard";
import RankingTable from "../../components/RankingTable";
import ChatCard from "../../components/ChatCard";
import MultiplierChart from "../../components/MultiplierChart";
import { Grid } from "@mui/material";
import StatisticsRow from "../../components/StatisticsRow";

export default function GamePage() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={10}
      style={{
        padding: 100,
      }}
    >
      <Grid item xs={4}>
        <WelcomeCard />
      </Grid>

      <Grid item xs={8}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={12}>
            <StatisticsRow />
          </Grid>
          <Grid item xs={12}>
            <MultiplierChart />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <RankingTable />
      </Grid>

      <Grid item xs={6}>
        <ChatCard />
      </Grid>
    </Grid>
  );
}
