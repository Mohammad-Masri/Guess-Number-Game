import React, { useState } from "react";
import { Grid } from "@mui/material";
import MyButton from "../MyButton";
import RoundMenu from "../RoundMenu";
import WelcomeForm from "../WelcomeForm";

enum WelcomeAndRoundMenuViews {
  WELCOME = "welcome",
  ROUND_MENU = "round-menu",
}

export default function WelcomeCard() {
  const [view, setView] = useState<WelcomeAndRoundMenuViews>(
    WelcomeAndRoundMenuViews.WELCOME
  );

  return (
    <>
      {view == WelcomeAndRoundMenuViews.WELCOME ? (
        <WelcomeForm
          onClickAcceptButton={() =>
            setView(WelcomeAndRoundMenuViews.ROUND_MENU)
          }
        />
      ) : (
        <RoundMenu />
      )}
    </>
  );
}
