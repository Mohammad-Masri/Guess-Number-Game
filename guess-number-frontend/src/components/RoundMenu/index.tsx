import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";
import NumberInput from "../NumberInput";
import CurrentRoundCard from "../CurrentRoundCard";
import SpeedSlider from "../SpeedSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGame,
  selectRoundStatus,
  setRoundStatus,
} from "../../store/slices/GameSlice";
import { RoundStatuses } from "../../dto/Game";
import { useParams } from "react-router-dom";
import { startNewRound } from "../../store/slices/GameSlice/actions";
export default function RoundMenu() {
  const params = useParams();
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(2);

  const roundStatus = useSelector(selectRoundStatus);
  const game = useSelector(selectGame);
  const youPlayer = game != null ? game.you : null;

  const dispatch = useDispatch();

  const handleClickStartButton = () => {
    startNewRound(dispatch, params.id + "", points, multiplier, () => {
      dispatch(setRoundStatus(RoundStatuses.RUNNING));
    });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid xs={5.7}>
            <NumberInput
              label="Points"
              id="points"
              value={points}
              setValue={setPoints}
              stepAmount={25}
              min={1}
              max={youPlayer != null ? youPlayer.points : 1000}
            />
          </Grid>
          <Grid xs={5.7}>
            <NumberInput
              label="Multiplier"
              id="multiplier"
              value={multiplier}
              setValue={setMultiplier}
              stepAmount={0.25}
              min={2}
              max={10}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={12}>
        <MyButton
          label="Start"
          onClick={handleClickStartButton}
          isDisabled={roundStatus == RoundStatuses.RUNNING}
        />
      </Grid>
      <Grid xs={12}>
        <CurrentRoundCard />
      </Grid>
      <Grid xs={12}>
        <SpeedSlider />
      </Grid>
    </Grid>
  );
}
