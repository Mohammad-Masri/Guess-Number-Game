import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/GameSlice";
import chatReducer from "./slices/ChatSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer,
  },
});
