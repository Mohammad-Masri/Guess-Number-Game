import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameResponse, GameStatuses, RoundStatuses } from '../../../dto/Game'

export interface GameState {
  roundSpeed: number
  roundStatus: string
  gameStatus: string
  game:GameResponse|null
}

const initialState: GameState = {
  roundSpeed: 1,
  roundStatus: RoundStatuses.PREPARING ,
  gameStatus: GameStatuses.PREPARING ,
  game:null
  
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state,action) => {

      state.game = action.payload
      if(state.game != null){
        state.gameStatus = GameStatuses.RUNNING
      }
    },
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

export const { setRoundSpeed,setRoundStatus,setGameStatus,setGame } = gameSlice.actions

export const selectGame = (state:any) => (state.game as GameState).game
export const selectRoundSpeed = (state:any) => (state.game as GameState).roundSpeed
export const selectRoundStatus = (state:any) => (state.game as GameState).roundStatus
export const selectGameStatus = (state:any) => (state.game as GameState).gameStatus

const gameReducer = gameSlice.reducer

export default gameReducer