import React, { useState } from "react";
import { Grid } from "@mui/material";
import MessagesCard from "../MessagesCard";
import MessageInput from "../MessageInput";
export default function ChatBox() {
  const [messageText, setMessageText] = useState<string>("");

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-end"
      style={{
        backgroundColor: "#181E25",
        borderRadius: 12,
        height: 250,
      }}
    >
      <Grid item xs={12}>
        <MessagesCard />
      </Grid>
      <Grid item xs={12}>
        <MessageInput
          messageText={messageText}
          setMessageText={setMessageText}
        />
      </Grid>
    </Grid>
  );
}
