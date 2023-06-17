import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import { Message } from "../../dto/Message";
import MessageItem from "../MessageItem";

const getMessages = () => [
  new Message("CPU 1", "Doing great"),
  new Message("Mohammed", "What about you?", true),
  new Message("Mohammed", "Good", true),
  new Message("CPU 1", "How are you Mohammad?"),
];

export default function MessagesCard() {
  const [messages, setMessages] = useState<Message[]>(getMessages().reverse());

  const [counter, setCounter] = useState<number>(1);

  const chatContainerRef = useRef<any>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("send new random message");
  //     const newMessage = new Message("Mohammed", counter + "", true);
  //     setMessages([...messages, newMessage]);
  //     setCounter(counter + 1);
  //   }, 1000 * 5);

  //   return () => clearInterval(interval);
  // }, []);

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
