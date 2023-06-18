import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MessageResponse } from '../../../dto/Message'

export interface ChatState {
  messages:MessageResponse[]
}

const initialState: ChatState = {
  messages:[]
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
 
   pushNewMessage: (state,action)=>{
    const newMessages = [...state.messages,action.payload,]
    state.messages = newMessages
   },
   setMessages: (state,action)=>{
    state.messages = action.payload
   },
 
  },
})


export const {pushNewMessage,setMessages } = chatSlice.actions

export const selectMessages = (state:any) => (state.chat as ChatState).messages


const chatReducer = chatSlice.reducer

export default chatReducer