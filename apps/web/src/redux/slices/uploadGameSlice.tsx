import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";
import { GamesDataType } from '../../types';

interface UploadGameSlice {
  game: GamesDataType | null;
}
const initialState = {
  game: null
} as UploadGameSlice;

export const uploadGameSlice = createSlice({
  name: "uploadGame",
  initialState,
  reducers: {
    addUploadGame: (state, action) => {
        state.game = action.payload
    }
  },
});

export const { addUploadGame } = uploadGameSlice.actions;

export default uploadGameSlice.reducer;
