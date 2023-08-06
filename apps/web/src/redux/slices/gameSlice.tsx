import { createSlice } from "@reduxjs/toolkit";
import { GamesDataType } from "../../types";
import { userApi } from "../api/userApi";

interface GameSlice {
  userDefaultGames: GamesDataType[];
  userGames: GamesDataType[];
  game: GamesDataType | null;
}
const initialState = {
  userDefaultGames: [],
  userGames: [],
  game: null,
} as GameSlice;

export const gameSlice = createSlice({
  name: "userGames",
  initialState,
  reducers: {
    addUserNewGame: (state, actions) => {
      state.userDefaultGames = [...state.userDefaultGames, actions.payload];
    },
    countUserPlay: (state, action) => {
      const id = action.payload;
      state.userDefaultGames.forEach((item) => {
        if (item.id === id) {
          item.plays++;
        }
        return item;
      });
    },
    countUserShare: (state, action) => {
      const id = action.payload;
      state.userDefaultGames.forEach((item) => {
        if (item.id === id) {
          item.shares++;
        }
        return item;
      });
    },
    countUserLikes: (state, action) => {
      const id = action.payload;
      state.userDefaultGames.forEach((item) => {
        if (item.id === id) {
          item.likes++;
          item.isLiked = true;
        }
        return item;
      });
    },
    removeUserLikes: (state, action) => {
      const id = action.payload;
      state.userDefaultGames.forEach((item) => {
        if (item.id === id) {
          item.likes--;
          item.isLiked = false;
        }
        return item;
      });
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.getUserDefaultGameList.matchFulfilled,
      (state, { payload }) => {
        if (state.userDefaultGames.length === 1) {
          state.userDefaultGames = [...payload];
        } else {
          state.userDefaultGames = [...state.userDefaultGames, ...payload];
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUserGames.matchFulfilled,
      (state, { payload }) => {
        if (state.userDefaultGames.length === 1) {
          state.userDefaultGames = [...payload];
        } else {
          state.userDefaultGames = [...state.userDefaultGames, ...payload];
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.getGame.matchFulfilled,
      (state, { payload }) => {
        const isGame = state.userDefaultGames.some(
          (item) => item.id === payload.id
        );
        if (!isGame) {
          state.userDefaultGames = [...state.userDefaultGames, payload];
        }
      }
    );
  },
});

export const {
  addUserNewGame,
  countUserPlay,
  countUserShare,
  countUserLikes,
  removeUserLikes,
} = gameSlice.actions;

export default gameSlice.reducer;
