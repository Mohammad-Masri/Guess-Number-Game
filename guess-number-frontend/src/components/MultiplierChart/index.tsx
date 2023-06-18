import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Chart from "react-apexcharts";
import {
  getRandomNumberBetweenTwoNumber,
  makeNumberFormat,
} from "../../helpers/number";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRoundSpeed,
  selectRoundStatus,
  setRoundStatus,
} from "../../store/slices/GameSlice";
import { RoundStatuses } from "../../dto/Game";

const roundMultiplierValue = getRandomNumberBetweenTwoNumber(1, 10);
console.log("roundMultiplierValue: ", roundMultiplierValue);

interface Point {
  X: number;
  Y: number;
}

const generatePointsUntilReachThisXValue = (
  xValue: number,
  pointsCount = 20
) => {
  const points: Point[] = [];
  const step = xValue / pointsCount;
  let maxY = 0;
  for (let i = 0; i < pointsCount; i++) {
    const newY = getRandomNumberBetweenTwoNumber(i, pointsCount - 1);
    if (newY > maxY) maxY = newY;
    points.push({
      X: i * step,
      Y: newY,
    });
  }
  return points;
};

interface Props {}

export default function MultiplierChart({}: Props) {
  const roundSpeed = useSelector(selectRoundSpeed);
  const chartValues = generatePointsUntilReachThisXValue(roundMultiplierValue);
  const height = 600;

  const [state, setState] = useState<any>({
    currentMultiplierValue: 0,
    counter: 0,
    XAxisValues: [],
    YAxisValues: [],
  });

  const dispatch = useDispatch();
  const roundStatus = useSelector(selectRoundStatus);

  const currentMultiplierValueColor =
    roundStatus == RoundStatuses.FINISH ? "#F24C5E" : "#FFF";
  useEffect(() => {
    if (roundStatus == RoundStatuses.RUNNING) {
      const interval = setInterval(() => {
        if (state.counter < chartValues.length) {
          setState((prevState: any) => {
            const newXAxisValues = [
              ...prevState.XAxisValues,
              chartValues[prevState.counter].X,
            ];
            const newYAxisValues = [
              ...prevState.YAxisValues,
              chartValues[prevState.counter].Y,
            ];

            return {
              ...prevState,
              currentMultiplierValue: chartValues[prevState.counter].X,
              counter: prevState.counter + 1,
              XAxisValues: newXAxisValues,
              YAxisValues: newYAxisValues,
            };
          });
        } else {
          setState((prevState: any) => {
            return {
              ...prevState,
              XAxisValues: [],
              YAxisValues: [],
              counter: 0,
            };
          });
          dispatch(setRoundStatus(RoundStatuses.FINISH));
        }
      }, 500 / roundSpeed);

      return () => clearInterval(interval);
    }
  }, [state, roundStatus]);

  const chart: any = {
    series: [
      {
        name: "Multiplier",
        data: state.YAxisValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ["#FDB622"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: state.XAxisValues,
        floating: false,
        labels: {
          show: true,
          rotate: 0,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshair: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false, // Hide y-axis labels
        },
      },
      legend: {
        show: false,
        position: "top",
      },
      grid: {
        show: true,
        position: "back",
        borderColor: "#B0B0B0",
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
      style={{
        background: "#1F2530",
        borderRadius: 12,
        border: "1px solid rgba(255, 253, 253, 0.253)",
        padding: 10,
        height,
      }}
    >
      <Grid item xs={12} style={{ position: "absolute", bottom: "55%" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: 84,
            color: currentMultiplierValueColor,
          }}
        >
          {makeNumberFormat(state.currentMultiplierValue)} X
        </p>
      </Grid>
      <Grid item xs={12} style={{ height: "90%" }}>
        <Chart height="100%" type="line" {...chart} />
      </Grid>
    </Grid>
  );
}
