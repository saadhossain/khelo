import { createSlice } from "@reduxjs/toolkit";

interface TemplateState {
  template: any;
  templateName: string | null;
}

const initialState = {
  template: null,
  templateName: null,
} as TemplateState;

export const templateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    selectGameForClone: (state, actions) => {
      state.template = actions.payload;
    },
    setGameName: (state, action) => {
      state.templateName = action.payload;
    },
  },
});

export const { selectGameForClone, setGameName } = templateSlice.actions;

export default templateSlice.reducer;
