import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameStatuses, RoundStatuses } from '../../../dto/Game'

export interface GameState {
  roundSpeed: number
  roundStatus: string
  gameStatus: string
}

const initialState: GameState = {
  roundSpeed: 1,
  roundStatus: RoundStatuses.PREPARING ,
  gameStatus: GameStatuses.PREPARING ,
  
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRoundSpeed: (state,action) => {

      state.roundSpeed = action.payload
    },
    setRoundStatus: (state,action) => {
        state.roundStatus = action.payload
      },
    setGameStatus: (state,action) => {

        state.gameStatus = action.payload
      },
 
  },
})

export const { setRoundSpeed,setRoundStatus,setGameStatus } = gameSlice.actions

export const selectRoundSpeed = (state:any) => (state.game as GameState).roundSpeed
export const selectRoundStatus = (state:any) => (state.game as GameState).roundStatus
export const selectGameStatus = (state:any) => (state.game as GameState).gameStatus

const gameReducer = gameSlice.reducer

export default gameReducer