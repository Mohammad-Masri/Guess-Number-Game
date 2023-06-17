import React from "react";
import { Grid } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "../ChatBox";
export default function ChatCard() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ height: 300 }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <ChatIcon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <p
              style={{
                color: "#fff",
                fontSize: "large",
              }}
            >
              Chat
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ChatBox />
      </Grid>
    </Grid>
  );
}
