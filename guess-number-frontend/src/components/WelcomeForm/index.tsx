import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";

interface Props {
  onClickAcceptButton: () => void;
}

export default function WelcomeForm({ onClickAcceptButton }: Props) {
  const [name, setName] = useState<string>("");
  const [acceptButtonEnabled, setAcceptButtonEnabled] = useState<boolean>(
    false
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setAcceptButtonEnabled(newName.length >= 3);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{
        minHeight: 500,

        backgroundColor: "#1f2530",
        borderRadius: 25,
        padding: 10,
      }}
    >
      <Grid item xs={12}>
        <p
          style={{
            color: "#a2a9b9",
            textAlign: "center",
            fontSize: "xx-large",
          }}
        >
          Welcome
        </p>
      </Grid>
      <Grid item xs={10}>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <p
              style={{
                color: "#444a58",
                fontSize: "smaller",
                textAlign: "center",
              }}
            >
              Please Insert Your Name
            </p>
          </Grid>
          <Grid item xs={12}>
            <input
              id="name"
              value={name}
              onChange={handleNameChange}
              style={{
                backgroundColor: "#14181d",
                width: "100%",
                borderRadius: 5,
                minHeight: 40,
                border: "#777",
                color: "#fff",
                textAlign: "start",
                fontSize: "larger",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <MyButton
              label="Accept"
              isDisabled={!acceptButtonEnabled}
              onClick={onClickAcceptButton}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
