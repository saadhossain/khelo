import { createSlice } from "@reduxjs/toolkit";

interface TextState {
  heading: string;
  subHeading: string;
  bodyText: string
}

const initialState = {
  heading: '',
  subHeading: '',
  bodyText: ''
} as TextState;

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    addHeading: (state, actions) => {
      state.heading = actions.payload;
    },
    addSubHeading: (state, action) => {
      state.subHeading = action.payload;
    },
    addBodyText: (state, action) => {
      state.bodyText = action.payload
    }
  },
});

export const { addHeading, addSubHeading, addBodyText } = textSlice.actions;

export default textSlice.reducer;
