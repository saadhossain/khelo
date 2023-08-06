import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authReducer from "./slices/authSlice";
import uploadGameReducer from "./slices/uploadGameSlice";
import gameReducer from "./slices/gameSlice";
import templateReducer from "./slices/templateSlice";
import userActivityReducer from "./slices/activitySlice";
import textReducer from './slices/textSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    uploadGame: uploadGameReducer,
    activity: userActivityReducer,
    template: templateReducer,
    [userApi.reducerPath]: userApi.reducer,
    text:textReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
