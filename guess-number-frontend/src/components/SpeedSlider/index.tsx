import React from "react";
import { Grid, Slider } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import { useDispatch, useSelector } from "react-redux";
import { selectRoundSpeed, setRoundSpeed } from "../../store/slices/GameSlice";

interface SpeedSliderMark {
  value: number;
  label?: React.ReactNode;
}

const speedSliderValues = [1, 2, 3, 4, 5];
const generateSpeedSliderMarks = () => {
  const marks: SpeedSliderMark[] = [];
  speedSliderValues.map((v) => {
    marks.push({
      value: v,
      label: <div style={{ color: "#FFF" }}>{`${v}X`}</div>,
    });
  });
  return marks;
};

interface Props {}

export default function SpeedSlider({}: Props) {
  const marks = generateSpeedSliderMarks();

  const roundSpeed = useSelector(selectRoundSpeed);
  const dispatch = useDispatch();

  const handleSpeedValueChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    dispatch(setRoundSpeed(newValue as number));
  };
  return (
    <Grid container justifyContent="flex-start" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <SpeedIcon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <p
              style={{
                color: "#fff",
                fontSize: "large",
              }}
            >
              Speed
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: "#1f2530",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <Slider
              // aria-label="Speed"
              value={roundSpeed}
              onChange={handleSpeedValueChange}
              // getAriaValueText={valuetext}
              // valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={5}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
