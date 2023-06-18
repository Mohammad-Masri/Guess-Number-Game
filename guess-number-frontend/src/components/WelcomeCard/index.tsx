import React from "react";
import RoundMenu from "../RoundMenu";
import WelcomeForm from "../WelcomeForm";
import { useSelector } from "react-redux";
import { selectGameStatus } from "../../store/slices/GameSlice";
import { GameStatuses } from "../../dto/Game";

export default function WelcomeCard() {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <>
      {gameStatus == GameStatuses.PREPARING ? <WelcomeForm /> : <RoundMenu />}
    </>
  );
}
