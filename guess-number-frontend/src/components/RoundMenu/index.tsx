import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";
import NumberInput from "../NumberInput";
import CurrentRoundCard from "../CurrentRoundCard";
import SpeedSlider from "../SpeedSlider";
export default function RoundMenu() {
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [speedSliderValue, setSpeedSliderValue] = useState<number>(1);

  const handleClickStartButton = () => {
    console.log("start");
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
            />
          </Grid>
          <Grid xs={5.7}>
            <NumberInput
              label="Multiplier"
              id="multiplier"
              value={multiplier}
              setValue={setMultiplier}
              stepAmount={0.25}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={12}>
        <MyButton label="Start" onClick={handleClickStartButton} />
      </Grid>
      <Grid xs={12}>
        <CurrentRoundCard />
      </Grid>
      <Grid xs={12}>
        <SpeedSlider value={speedSliderValue} setValue={setSpeedSliderValue} />
      </Grid>
    </Grid>
  );
}
