import { NavigateFunction } from "react-router-dom";
import { setGame } from ".";
import axiosInstance from "../../../config/axios";
import { SERVER_URL } from "../../../config/server";
import { handleServerError } from "../../../helpers/error-handler";
import { GameResponse } from "../../../dto/Game";

export const fetchGameDetails = (dispatch: any, game_id: string) => {
  axiosInstance
    .get(SERVER_URL + "/api/game/" + game_id)
    .then((res) => {
      dispatch(setGame(res.data));
    })
    .catch((error) => {
      handleServerError(error);
    });
};

export const startNewGame = (
  dispatch: any,
  username: string,
  navigate: NavigateFunction,
  onSuccess: () => void = () => {}
) => {
  axiosInstance
    .post(SERVER_URL + "/api/game", {
      username,
    })
    .then((res) => {
      dispatch(setGame(res.data));
      onSuccess();
      navigate(`/${(res.data as GameResponse).game_id}`, { replace: true });
    })
    .catch((error) => {
      handleServerError(error);
    });
};
