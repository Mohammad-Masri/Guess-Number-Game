import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";

interface Props {
  messageText: string;
  setMessageText: (text: string) => void;
}

export default function MessageInput({ messageText, setMessageText }: Props) {
  const [sendButtonEnabled, setSendButtonEnabled] = useState<boolean>(false);

  const handleMessageTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setMessageText(newMessage);

    setSendButtonEnabled(newMessage.trim().length > 0);
  };

  const handleClickSendButton = () => {
    console.log("send");
    setMessageText("");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        padding: 10,
        backgroundColor: "#303843",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      <Grid item xs={10}>
        <input
          type="text"
          value={messageText}
          onChange={handleMessageTextChange}
          style={{
            width: "90%",
            color: "#FFF",
            backgroundColor: "#181E25",
            borderRadius: 12,
            height: 30,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <MyButton
          label="Send"
          isDisabled={!sendButtonEnabled}
          onClick={handleClickSendButton}
        />
      </Grid>
    </Grid>
  );
}
