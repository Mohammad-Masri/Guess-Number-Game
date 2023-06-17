import React from "react";
import { Grid } from "@mui/material";
import { Message } from "../../dto/Message";
import { generateColorCode } from "../../helpers/color";

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  const senderNameColor = generateColorCode(message.senderName);
  const messageBackgroundColor = message.isYou ? "#5C6473" : "#3D4554";

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item>
        <p style={{ color: senderNameColor }}>{message.senderName}:</p>
      </Grid>
      <Grid item>
        <p
          style={{
            padding: 5,
            backgroundColor: messageBackgroundColor,
            color: "#FFF",
            borderRadius: 12,
          }}
        >
          {message.messageText}
        </p>
      </Grid>
    </Grid>
  );
}
