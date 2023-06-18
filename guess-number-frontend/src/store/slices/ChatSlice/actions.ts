import axiosInstance from "../../../config/axios";
import { SERVER_URL } from "../../../config/server";
import { handleServerError } from "../../../helpers/error-handler";
import { setMessages } from ".";

export const fetchMessages = (dispatch: any, game_id: string) => {
  axiosInstance
    .get(SERVER_URL + "/api/game/" + game_id + "/message")
    .then((res) => {
      dispatch(setMessages(res.data));
    })
    .catch((error) => {
      handleServerError(error);
    });
};
