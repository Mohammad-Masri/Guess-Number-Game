import React from "react";
import { Grid } from "@mui/material";
import { generateColorCode } from "../../helpers/color";
import { MessageResponse } from "../../dto/Message";
import { useSelector } from "react-redux";
import { selectGame } from "../../store/slices/GameSlice";

interface Props {
  message: MessageResponse;
}

export default function MessageItem({ message }: Props) {
  const game = useSelector(selectGame);
  const youPlayer = game != null ? game.you : null;

  const isYou =
    youPlayer != null && youPlayer.id == message.sender_id ? true : false;
  const senderNameColor = generateColorCode(message.sender_username);
  const messageBackgroundColor = isYou ? "#5C6473" : "#3D4554";

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item>
        <p style={{ color: senderNameColor }}>{message.sender_username}:</p>
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
          {message.content}
        </p>
      </Grid>
    </Grid>
  );
}
