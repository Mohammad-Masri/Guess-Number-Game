import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/GameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
