import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";
import { useDispatch } from "react-redux";
import { startNewGame } from "../../store/slices/GameSlice/actions";
import { setGameStatus, setRoundStatus } from "../../store/slices/GameSlice";
import { GameStatuses, RoundStatuses } from "../../dto/Game";
import { useNavigate } from "react-router-dom";

interface Props {}

export default function WelcomeForm({}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [acceptButtonEnabled, setAcceptButtonEnabled] = useState<boolean>(
    false
  );

  const handleClickAcceptButton = () => {
    startNewGame(dispatch, name, navigate, () => {
      dispatch(setGameStatus(GameStatuses.RUNNING));
      dispatch(setRoundStatus(RoundStatuses.PREPARING));
      setName("");
    });
  };

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
              onClick={handleClickAcceptButton}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
