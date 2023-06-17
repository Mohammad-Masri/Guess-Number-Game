import React from "react";
import WelcomeCard from "../../components/WelcomeCard";
import RankingTable from "../../components/RankingTable";
import ChatCard from "../../components/ChatCard";
import MultiplierChart from "../../components/MultiplierChart";
import { Grid } from "@mui/material";

export default function GamePage() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={10}
      style={{
        padding: 100,
      }}
    >
      <Grid item xs={4}>
        <WelcomeCard />
      </Grid>

      <Grid item xs={8}>
        <MultiplierChart />
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
