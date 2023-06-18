import { setGame } from ".";
import axiosInstance from "../../../config/axios";
import { SERVER_URL } from "../../../config/server";
import { handleServerError } from "../../../helpers/error-handler";

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
