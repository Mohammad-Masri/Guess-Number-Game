import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "../ChatBox";
import { useParams } from "react-router-dom";
import { SocketHandler } from "../../config/socket";
import { SERVER_URL } from "../../config/server";
import { useDispatch, useSelector } from "react-redux";
import { selectGame } from "../../store/slices/GameSlice";

export let socketHandler: SocketHandler | null = null;

export default function ChatCard() {
  const params = useParams();

  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const playerId =
    game != null ? (game.you != null ? game.you.id : null) : null;

  useEffect(() => {
    if (params.id != null) {
      if (socketHandler == null && playerId != null) {
        socketHandler = new SocketHandler(
          `${SERVER_URL}/gateway/message?game_id=${params.id}`,
          params.id,
          playerId,
          dispatch
        );
      }
    }
  }, [params.id, dispatch, playerId]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ height: 300 }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <ChatIcon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <p
              style={{
                color: "#fff",
                fontSize: "large",
              }}
            >
              Chat
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ChatBox />
      </Grid>
    </Grid>
  );
}
