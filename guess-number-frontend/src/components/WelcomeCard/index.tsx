import React from "react";
import RoundMenu from "../RoundMenu";
import WelcomeForm from "../WelcomeForm";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGameStatus,
  setGameStatus,
  setRoundStatus,
} from "../../store/slices/GameSlice";
import { GameStatuses, RoundStatuses } from "../../dto/Game";

export default function WelcomeCard() {
  const gameStatus = useSelector(selectGameStatus);
  const dispatch = useDispatch();

  return (
    <>
      {gameStatus == GameStatuses.PREPARING ? (
        <WelcomeForm
          onClickAcceptButton={() => {
            dispatch(setGameStatus(GameStatuses.RUNNING));
            dispatch(setRoundStatus(RoundStatuses.PREPARING));
          }}
        />
      ) : (
        <RoundMenu />
      )}
    </>
  );
}
