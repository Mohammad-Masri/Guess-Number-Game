import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import MessageItem from "../MessageItem";
import { useSelector } from "react-redux";
import { selectMessages } from "../../store/slices/ChatSlice";

export default function MessagesCard() {
  const [counter, setCounter] = useState<number>(1);

  const messages = useSelector(selectMessages);
  console.log("messages\n", messages);
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{ maxHeight: 200, overflowY: "auto", paddingLeft: 10 }}
      ref={chatContainerRef}
    >
      <Grid container direction="column" style={{ height: "100%" }}>
        <Grid item xs={12} style={{ alignSelf: "flex-start" }}>
          {messages.map((m, index) => (
            <Grid key={index} item style={{ width: "100%" }}>
              <MessageItem message={m} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
